import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useParams } from "wouter";
import { ArrowLeftIcon, BookmarkIcon, HomeIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";

export const IndividualCalculatorPage = () => {
  const [, setLocation] = useLocation();
  const params = useParams();
  const calculatorType = params.type;

  // SIP Calculator State
  const [sipData, setSipData] = useState({
    monthlyInvestment: "",
    expectedReturn: "",
    timePeriod: ""
  });
  const [sipResult, setSipResult] = useState<any>(null);

  // EMI Calculator State
  const [emiData, setEmiData] = useState({
    loanAmount: "",
    interestRate: "",
    tenure: ""
  });
  const [emiResult, setEmiResult] = useState<any>(null);

  // Budget Planner State
  const [budgetData, setBudgetData] = useState({
    monthlyIncome: "",
    expenses: "",
    savingsGoal: ""
  });
  const [budgetResult, setBudgetResult] = useState<any>(null);

  // Tax Estimator State
  const [taxData, setTaxData] = useState({
    annualIncome: "",
    taxRegime: "old"
  });
  const [taxResult, setTaxResult] = useState<any>(null);

  // Calculate SIP
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

  // Calculate EMI
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

  // Calculate Budget
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

  // Calculate Tax
  const calculateTax = () => {
    const income = parseFloat(taxData.annualIncome);
    
    if (income) {
      let tax = 0;
      let effectiveRate = 0;

      // Old Tax Regime Calculation (simplified)
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
        // New Tax Regime (simplified)
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

      effectiveRate = (tax / income) * 100;
      const netIncome = income - tax;

      setTaxResult({
        tax: Math.round(tax),
        effectiveRate: effectiveRate.toFixed(2),
        netIncome: Math.round(netIncome)
      });
    }
  };

  const getCalculatorInfo = () => {
    switch (calculatorType) {
      case "sip":
        return { title: "SIP Calculator", icon: "📈" };
      case "budget":
        return { title: "Budget Planner", icon: "💰" };
      case "emi":
        return { title: "EMI Calculator", icon: "🏠" };
      case "tax":
        return { title: "Tax Estimator", icon: "📊" };
      default:
        return { title: "Calculator", icon: "🔢" };
    }
  };

  const calculatorInfo = getCalculatorInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with dark gradient */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 pt-12 pb-6 relative">
        {/* Status bar */}
        <div className="flex items-center justify-between text-white text-sm font-semibold mb-6">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1.5 bg-white rounded-full"></div>
              <div className="w-1 h-2 bg-white rounded-full"></div>
              <div className="w-1 h-2.5 bg-white rounded-full"></div>
            </div>
            <svg className="w-4 h-4 fill-white ml-1" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <div className="w-6 h-3 border border-white rounded-sm ml-1 relative">
              <div className="w-4/5 h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Header content */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation("/calculators")}
              className="text-white hover:bg-white/10 p-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-xl font-bold mb-1">{calculatorInfo.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-t-3xl min-h-screen px-6 py-6">
        {/* SIP Calculator */}
        {calculatorType === "sip" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">📈</span>
                SIP Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
                <Input
                  id="monthlyInvestment"
                  type="number"
                  value={sipData.monthlyInvestment}
                  onChange={(e) => setSipData({...sipData, monthlyInvestment: e.target.value})}
                  placeholder="Enter monthly SIP amount"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  value={sipData.expectedReturn}
                  onChange={(e) => setSipData({...sipData, expectedReturn: e.target.value})}
                  placeholder="Enter expected return rate"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="timePeriod">Time Period (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  value={sipData.timePeriod}
                  onChange={(e) => setSipData({...sipData, timePeriod: e.target.value})}
                  placeholder="Enter investment period"
                  className="mt-1"
                />
              </div>
              <Button onClick={calculateSIP} className="w-full bg-blue-600 hover:bg-blue-700">
                Calculate SIP Returns
              </Button>
              
              {sipResult && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-800 mb-4 text-lg">SIP Investment Results</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Maturity Amount:</span>
                      <span className="font-bold text-green-600 text-lg">₹{sipResult.maturityAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Total Investment:</span>
                      <span className="font-bold text-blue-600">₹{sipResult.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Total Gains:</span>
                      <span className="font-bold text-orange-600">₹{sipResult.totalGains.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* EMI Calculator */}
        {calculatorType === "emi" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                EMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={emiData.loanAmount}
                  onChange={(e) => setEmiData({...emiData, loanAmount: e.target.value})}
                  placeholder="Enter loan amount"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={emiData.interestRate}
                  onChange={(e) => setEmiData({...emiData, interestRate: e.target.value})}
                  placeholder="Enter interest rate"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  value={emiData.tenure}
                  onChange={(e) => setEmiData({...emiData, tenure: e.target.value})}
                  placeholder="Enter loan tenure"
                  className="mt-1"
                />
              </div>
              <Button onClick={calculateEMI} className="w-full bg-orange-600 hover:bg-orange-700">
                Calculate EMI
              </Button>
              
              {emiResult && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-4 text-lg">EMI Calculation Results</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Monthly EMI:</span>
                      <span className="font-bold text-blue-600 text-lg">₹{emiResult.emi.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Total Amount:</span>
                      <span className="font-bold text-red-600">₹{emiResult.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Total Interest:</span>
                      <span className="font-bold text-orange-600">₹{emiResult.totalInterest.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Budget Planner */}
        {calculatorType === "budget" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Budget Planner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={budgetData.monthlyIncome}
                  onChange={(e) => setBudgetData({...budgetData, monthlyIncome: e.target.value})}
                  placeholder="Enter monthly income"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={budgetData.expenses}
                  onChange={(e) => setBudgetData({...budgetData, expenses: e.target.value})}
                  placeholder="Enter monthly expenses"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="savingsGoal">Savings Goal (₹) - Optional</Label>
                <Input
                  id="savingsGoal"
                  type="number"
                  value={budgetData.savingsGoal}
                  onChange={(e) => setBudgetData({...budgetData, savingsGoal: e.target.value})}
                  placeholder="Enter savings goal"
                  className="mt-1"
                />
              </div>
              <Button onClick={calculateBudget} className="w-full bg-purple-600 hover:bg-purple-700">
                Analyze Budget
              </Button>
              
              {budgetResult && (
                <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-4 text-lg">Budget Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Available for Savings:</span>
                      <span className="font-bold text-green-600 text-lg">₹{budgetResult.availableForSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Savings Rate:</span>
                      <span className="font-bold text-blue-600">{budgetResult.savingsPercentage}%</span>
                    </div>
                    {budgetData.savingsGoal && (
                      <div className={`p-3 bg-white rounded-lg ${budgetResult.canAchieveGoal ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                        <p className={`font-medium ${budgetResult.canAchieveGoal ? 'text-green-600' : 'text-red-600'}`}>
                          {budgetResult.canAchieveGoal ? '✅ Savings goal achievable!' : `⚠️ Shortfall: ₹${budgetResult.shortfall.toLocaleString()}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tax Estimator */}
        {calculatorType === "tax" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Tax Estimator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={taxData.annualIncome}
                  onChange={(e) => setTaxData({...taxData, annualIncome: e.target.value})}
                  placeholder="Enter annual income"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="taxRegime">Tax Regime</Label>
                <select 
                  id="taxRegime"
                  value={taxData.taxRegime}
                  onChange={(e) => setTaxData({...taxData, taxRegime: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md mt-1"
                >
                  <option value="old">Old Tax Regime</option>
                  <option value="new">New Tax Regime</option>
                </select>
              </div>
              <Button onClick={calculateTax} className="w-full bg-cyan-600 hover:bg-cyan-700">
                Calculate Tax
              </Button>
              
              {taxResult && (
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <h4 className="font-bold text-orange-800 mb-4 text-lg">Tax Calculation</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Income Tax:</span>
                      <span className="font-bold text-red-600 text-lg">₹{taxResult.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Effective Tax Rate:</span>
                      <span className="font-bold text-orange-600">{taxResult.effectiveRate}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium text-gray-700">Net Income:</span>
                      <span className="font-bold text-green-600 text-lg">₹{taxResult.netIncome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="pb-20"></div>
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/dashboard")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/learning")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-500">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500">Learn</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/gaming")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500">Game</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-0 min-w-0">
            <div className="w-6 h-6 flex items-center justify-center">
              <MessageCircleIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-0 min-w-0"
            onClick={() => setLocation("/settings")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};