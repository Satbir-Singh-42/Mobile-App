import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Using simple select with HTML select element for better compatibility
import { useLocation, useParams } from "wouter";
import { ArrowLeftIcon, BellIcon, UserIcon, CalculatorIcon, TrendingUpIcon, PiggyBankIcon, CreditCardIcon, HomeIcon, MessageCircleIcon } from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";

export const IndividualCalculatorPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const calculatorType = params.type;

  // Calculator configuration
  const calculatorConfig = {
    sip: {
      title: "SIP Calculator",
      subtitle: "Estimate your investment returns",
      icon: TrendingUpIcon,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    budget: {
      title: "Budget Planner", 
      subtitle: "Plan your monthly expenses",
      icon: PiggyBankIcon,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100"
    },
    emi: {
      title: "EMI Calculator",
      subtitle: "Calculate loan payments",
      icon: CreditCardIcon,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100"
    },
    tax: {
      title: "Tax Estimator",
      subtitle: "Estimate your tax liability",
      icon: CalculatorIcon,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100"
    }
  };

  const config = calculatorConfig[calculatorType as keyof typeof calculatorConfig] || calculatorConfig.sip;
  const IconComponent = config.icon;

  // State for all calculators
  const [sipData, setSipData] = useState({
    monthlyInvestment: "",
    expectedReturn: "",
    timePeriod: ""
  });
  const [sipResult, setSipResult] = useState<any>(null);

  const [emiData, setEmiData] = useState({
    loanAmount: "",
    interestRate: "",
    tenure: ""
  });
  const [emiResult, setEmiResult] = useState<any>(null);

  const [budgetData, setBudgetData] = useState({
    monthlyIncome: "",
    expenses: "",
    savingsGoal: ""
  });
  const [budgetResult, setBudgetResult] = useState<any>(null);

  const [taxData, setTaxData] = useState({
    annualIncome: "",
    taxRegime: "old"
  });
  const [taxResult, setTaxResult] = useState<any>(null);

  // Calculator functions
  const calculateSIP = () => {
    const P = parseFloat(sipData.monthlyInvestment);
    const r = parseFloat(sipData.expectedReturn) / 100 / 12;
    const n = parseFloat(sipData.timePeriod) * 12;

    if (P && r && n) {
      const maturityAmount = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const totalInvestment = P * n;
      const totalGains = maturityAmount - totalInvestment;

      setSipResult({
        maturityAmount: Math.round(maturityAmount),
        totalInvestment: Math.round(totalInvestment),
        totalGains: Math.round(totalGains)
      });
    }
  };

  const calculateEMI = () => {
    const P = parseFloat(emiData.loanAmount);
    const r = parseFloat(emiData.interestRate) / 100 / 12;
    const n = parseFloat(emiData.tenure) * 12;

    if (P && r && n) {
      const emi = P * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;

      setEmiResult({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest)
      });
    }
  };

  const calculateBudget = () => {
    const income = parseFloat(budgetData.monthlyIncome);
    const expenses = parseFloat(budgetData.expenses);
    const savingsGoal = parseFloat(budgetData.savingsGoal);

    if (income && expenses) {
      const availableForSavings = income - expenses;
      const savingsPercentage = (availableForSavings / income) * 100;
      const canAchieveGoal = savingsGoal ? availableForSavings >= savingsGoal : true;

      setBudgetResult({
        availableForSavings: Math.round(availableForSavings),
        savingsPercentage: Math.round(savingsPercentage),
        canAchieveGoal,
        shortfall: savingsGoal ? Math.max(0, savingsGoal - availableForSavings) : 0
      });
    }
  };

  const calculateTax = () => {
    const income = parseFloat(taxData.annualIncome);
    
    if (income) {
      let tax = 0;
      
      if (taxData.taxRegime === "old") {
        if (income > 250000) {
          if (income <= 500000) {
            tax = (income - 250000) * 0.05;
          } else if (income <= 1000000) {
            tax = 12500 + (income - 500000) * 0.20;
          } else {
            tax = 112500 + (income - 1000000) * 0.30;
          }
        }
      } else {
        if (income > 300000) {
          if (income <= 600000) {
            tax = (income - 300000) * 0.05;
          } else if (income <= 900000) {
            tax = 15000 + (income - 600000) * 0.10;
          } else if (income <= 1200000) {
            tax = 45000 + (income - 900000) * 0.15;
          } else if (income <= 1500000) {
            tax = 90000 + (income - 1200000) * 0.20;
          } else {
            tax = 150000 + (income - 1500000) * 0.30;
          }
        }
      }

      const effectiveRate = (tax / income) * 100;
      const netIncome = income - tax;

      setTaxResult({
        tax: Math.round(tax),
        effectiveRate: effectiveRate.toFixed(2),
        netIncome: Math.round(netIncome)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with clean gradient matching dashboard */}
      <div className={`bg-gradient-to-r ${config.color} px-6 pt-8 pb-8 relative`}>
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation("/calculators")}
              className="text-white hover:bg-white/10 p-2 rounded-full"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">{config.title}</h1>
                <p className="text-white/80 text-sm">{config.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2 rounded-full">
              <BellIcon className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl min-h-screen px-6 py-8">
        {/* SIP Calculator */}
        {calculatorType === "sip" && (
          <div className="space-y-6">
            <Card className={`border-0 shadow-lg rounded-2xl overflow-hidden ${config.bgColor}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800">Investment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthlyInvestment" className="text-sm font-medium text-gray-700">Monthly Investment (₹)</Label>
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    placeholder="e.g., 5000"
                    value={sipData.monthlyInvestment}
                    onChange={(e) => setSipData({...sipData, monthlyInvestment: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="expectedReturn" className="text-sm font-medium text-gray-700">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    placeholder="e.g., 12"
                    value={sipData.expectedReturn}
                    onChange={(e) => setSipData({...sipData, expectedReturn: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="timePeriod" className="text-sm font-medium text-gray-700">Time Period (Years)</Label>
                  <Input
                    id="timePeriod"
                    type="number"
                    placeholder="e.g., 10"
                    value={sipData.timePeriod}
                    onChange={(e) => setSipData({...sipData, timePeriod: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={calculateSIP} 
                  className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Calculate SIP Returns
                </Button>
              </CardContent>
            </Card>

            {sipResult && (
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">Investment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Maturity Amount</p>
                      <p className="text-2xl font-bold text-green-600">₹{sipResult.maturityAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Total Investment</p>
                      <p className="text-xl font-semibold text-blue-600">₹{sipResult.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Total Gains</p>
                      <p className="text-xl font-semibold text-purple-600">₹{sipResult.totalGains.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* EMI Calculator */}
        {calculatorType === "emi" && (
          <div className="space-y-6">
            <Card className={`border-0 shadow-lg rounded-2xl overflow-hidden ${config.bgColor}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800">Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="e.g., 1000000"
                    value={emiData.loanAmount}
                    onChange={(e) => setEmiData({...emiData, loanAmount: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-orange-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">Interest Rate (% per annum)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    placeholder="e.g., 9.5"
                    value={emiData.interestRate}
                    onChange={(e) => setEmiData({...emiData, interestRate: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-orange-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="tenure" className="text-sm font-medium text-gray-700">Loan Tenure (Years)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="e.g., 20"
                    value={emiData.tenure}
                    onChange={(e) => setEmiData({...emiData, tenure: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-orange-500 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={calculateEMI} 
                  className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>

            {emiResult && (
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-800">EMI Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Monthly EMI</p>
                      <p className="text-2xl font-bold text-orange-600">₹{emiResult.emi.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl font-semibold text-blue-600">₹{emiResult.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Total Interest</p>
                      <p className="text-xl font-semibold text-red-600">₹{emiResult.totalInterest.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Budget Planner */}
        {calculatorType === "budget" && (
          <div className="space-y-6">
            <Card className={`border-0 shadow-lg rounded-2xl overflow-hidden ${config.bgColor}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800">Monthly Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="e.g., 50000"
                    value={budgetData.monthlyIncome}
                    onChange={(e) => setBudgetData({...budgetData, monthlyIncome: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="expenses" className="text-sm font-medium text-gray-700">Monthly Expenses (₹)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    placeholder="e.g., 30000"
                    value={budgetData.expenses}
                    onChange={(e) => setBudgetData({...budgetData, expenses: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="savingsGoal" className="text-sm font-medium text-gray-700">Savings Goal (₹) - Optional</Label>
                  <Input
                    id="savingsGoal"
                    type="number"
                    placeholder="e.g., 15000"
                    value={budgetData.savingsGoal}
                    onChange={(e) => setBudgetData({...budgetData, savingsGoal: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-purple-500 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={calculateBudget} 
                  className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Analyze Budget
                </Button>
              </CardContent>
            </Card>

            {budgetResult && (
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-800">Budget Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Available for Savings</p>
                      <p className="text-2xl font-bold text-green-600">₹{budgetResult.availableForSavings.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Savings Percentage</p>
                      <p className="text-xl font-semibold text-blue-600">{budgetResult.savingsPercentage}%</p>
                    </div>
                    {budgetData.savingsGoal && (
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-sm text-gray-600">Goal Status</p>
                        <p className={`text-xl font-semibold ${budgetResult.canAchieveGoal ? 'text-green-600' : 'text-red-600'}`}>
                          {budgetResult.canAchieveGoal ? 'Goal Achievable!' : `Shortfall: ₹${budgetResult.shortfall}`}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tax Estimator */}
        {calculatorType === "tax" && (
          <div className="space-y-6">
            <Card className={`border-0 shadow-lg rounded-2xl overflow-hidden ${config.bgColor}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800">Tax Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="annualIncome" className="text-sm font-medium text-gray-700">Annual Income (₹)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    placeholder="e.g., 800000"
                    value={taxData.annualIncome}
                    onChange={(e) => setTaxData({...taxData, annualIncome: e.target.value})}
                    className="mt-1 border-gray-200 focus:border-cyan-500 rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Tax Regime</Label>
                  <select 
                    value={taxData.taxRegime} 
                    onChange={(e) => setTaxData({...taxData, taxRegime: e.target.value})}
                    className="w-full mt-1 border border-gray-200 focus:border-cyan-500 rounded-xl px-3 py-2 bg-white"
                  >
                    <option value="old">Old Tax Regime</option>
                    <option value="new">New Tax Regime</option>
                  </select>
                </div>
                <Button 
                  onClick={calculateTax} 
                  className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            {taxResult && (
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-800">Tax Calculation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Tax Payable</p>
                      <p className="text-2xl font-bold text-red-600">₹{taxResult.tax.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Effective Tax Rate</p>
                      <p className="text-xl font-semibold text-orange-600">{taxResult.effectiveRate}%</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600">Net Income</p>
                      <p className="text-xl font-semibold text-green-600">₹{taxResult.netIncome.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Bottom navigation spacing */}
        <div className="pb-24"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-40">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/dashboard")}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/learning")}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <CalculatorIcon className="w-5 h-5" />
            <span className="text-xs">Learning</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/planner")}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <MessageCircleIcon className="w-5 h-5" />
            <span className="text-xs">Planner</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/gaming")}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <span className="text-lg">🎮</span>
            <span className="text-xs">Gaming</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/profile")}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-24 right-4 z-50">
        <ChatWidget 
          userContext={{
            username: "User",
            hasCompletedQuestionnaire: true,
            currentPage: `calculator-${calculatorType}`
          }}
        />
      </div>
    </div>
  );
};