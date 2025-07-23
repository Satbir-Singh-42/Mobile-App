import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState } from "react";
import { 
  ArrowLeftIcon, 
  SearchIcon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
  HomeIcon,
  MessageSquareIcon,
  UserIcon
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  completed: boolean;
  color: string;
}

export const PlannerPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date(2020, 9, 24)); // Oct 24, 2020
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design Changes",
      description: "Lorem ipsum dolor sit amet, et adipiscing elit, sed dislutmod nibh euismod. dolor sit amet, et adipiscing elit, sed dislutmod nibh euismod.",
      date: "Oct 24, 2020",
      startTime: "01:22 pm",
      endTime: "03:20 pm",
      category: "Design",
      completed: false,
      color: "bg-[#6366F1]"
    },
    {
      id: 2,
      title: "Design Changes",
      description: "Review and implement new design specifications for the financial dashboard",
      date: "Oct 24, 2020",
      startTime: "04:00 pm",
      endTime: "05:30 pm",
      category: "Design",
      completed: false,
      color: "bg-[#6366F1]"
    },
    {
      id: 3,
      title: "Design Changes",
      description: "Finalize color schemes and typography for mobile interface",
      date: "Oct 24, 2020",
      startTime: "06:00 pm",
      endTime: "07:15 pm",
      category: "Design",
      completed: true,
      color: "bg-[#6366F1]"
    },
    {
      id: 4,
      title: "Design Changes",
      description: "Create wireframes for new user onboarding flow",
      date: "Oct 24, 2020",
      startTime: "08:00 pm",
      endTime: "09:30 pm",
      category: "Design",
      completed: false,
      color: "bg-[#6366F1]"
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    category: "Design"
  });

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const daysInMonth = [3, 4, 5, 6, 7, 8, 9]; // Oct 2020 calendar partial view

  const categories = [
    { name: "Design", color: "bg-[#6366F1]" },
    { name: "Meeting", color: "bg-[#10B981]" },
    { name: "Coding", color: "bg-[#F59E0B]" },
    { name: "Self", color: "bg-[#EF4444]" },
    { name: "Testing", color: "bg-[#8B5CF6]" },
    { name: "Others", color: "bg-[#6B7280]" }
  ];

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const createTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      date: currentDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      startTime: newTask.startTime,
      endTime: newTask.endTime,
      category: newTask.category,
      completed: false,
      color: categories.find(cat => cat.name === newTask.category)?.color || "bg-[#6366F1]"
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      category: "Design"
    });
    setShowCreateTask(false);
  };

  if (showCreateTask) {
    return (
      <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateTask(false)}
              className="p-2 text-white hover:bg-white/20"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Create a Task</h1>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-white hover:bg-white/20"
            >
              <SearchIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Create Task Form */}
        <main className="px-6 py-6">
          <div className="space-y-6">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Design Changes"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="text-lg font-semibold text-[#6366F1]">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input
                  type="time"
                  value={newTask.startTime}
                  onChange={(e) => setNewTask(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="time"
                  value={newTask.endTime}
                  onChange={(e) => setNewTask(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Lorem ipsum dolor sit amet, et adipiscing elit, sed dislumod nibh euismod. dolor sit amet, et adipiscing elit, sed dislumod nibh euismod."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Categories</label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    onClick={() => setNewTask(prev => ({ ...prev, category: category.name }))}
                    className={`py-2 px-4 rounded-lg text-sm font-medium ${
                      newTask.category === category.name
                        ? `${category.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <Button
              onClick={createTask}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg font-semibold text-lg"
            >
              Create Task
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="p-2 text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#1F2937]">Task calendar</h1>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600"
          >
            <SearchIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#1F2937]">Oct, 2020</h2>
          <Button
            onClick={() => setShowCreateTask(true)}
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add task
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          {daysInMonth.map(day => (
            <div
              key={day}
              className={`text-center py-2 text-sm ${
                day === 24 
                  ? 'bg-[#6366F1] text-white rounded-lg font-semibold' 
                  : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <main className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F2937]">Tasks</h3>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <Card 
              key={task.id} 
              className={`border-0 shadow-sm hover:shadow-md transition-shadow ${
                task.completed ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-16 ${task.color} rounded-full flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${
                        task.completed ? 'text-gray-500 line-through' : 'text-[#1F2937]'
                      }`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`p-1 h-6 w-6 ${
                            task.completed 
                              ? 'text-green-600 hover:text-green-700'
                              : 'text-gray-400 hover:text-green-600'
                          }`}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTask(task)}
                          className="p-1 text-gray-400 hover:text-blue-600 h-6 w-6"
                        >
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-gray-400 hover:text-red-600 h-6 w-6"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className={`text-xs mb-2 ${
                      task.completed ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{task.startTime} - {task.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{task.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Tasks Scheduled</h3>
            <p className="text-gray-400 mb-4">Create your first task to get started with planning!</p>
            <Button
              onClick={() => setShowCreateTask(true)}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-lg"
            >
              Create Task
            </Button>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6">
        <Button
          onClick={() => setShowCreateTask(true)}
          className="w-14 h-14 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <PlusIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-3">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/dashboard")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-gray-400" />
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/search")}
          >
            <SearchIcon className="w-6 h-6 text-gray-400" />
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2">
            <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/notifications")}
          >
            <MessageSquareIcon className="w-6 h-6 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2"
            onClick={() => setLocation("/profile")}
          >
            <UserIcon className="w-6 h-6 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};