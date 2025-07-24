import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskAPI } from "@/lib/taskAPI";
import type { Task, InsertTask } from "@shared/schema";
import { 
  ArrowLeftIcon, 
  SearchIcon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  EditIcon,
  TrashIcon,

  HomeIcon,
  MessageSquareIcon,
  UserIcon,
  GiftIcon
} from "lucide-react";
import { ChatWidget } from "@/components/ui/chat-widget";
import { authAPI } from "@/lib/auth";



export const PlannerPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskMenu, setShowTaskMenu] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = authAPI.getUser();
    setUser(userData);
  }, []);

  // Fetch tasks from API
  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: () => taskAPI.getTasks(),
  });

  // Get all tasks for planner - show ALL tasks, not just 2
  const allTasks = tasksData?.tasks || [];
  const tasks = allTasks.sort((a, b) => {
    // Sort by date and time for proper ordering
    const dateA = new Date(`${a.date} ${a.startTime}`);
    const dateB = new Date(`${b.date} ${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: taskAPI.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setShowCreateTask(false);
      setNewTask({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        category: "Budget Planning",
        date: currentDate.toISOString().split('T')[0],
        isAllDay: false
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Task> }) =>
      taskAPI.updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setSelectedTask(null);
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: taskAPI.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });



  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    category: "Budget Planning",
    date: currentDate.toISOString().split('T')[0], // YYYY-MM-DD format
    isAllDay: false
  });

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  // Dynamic calendar based on current date instead of hardcoded Oct 2020
  const getCurrentWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Start from Monday
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day.getDate());
    }
    return days;
  };
  
  const daysInMonth = getCurrentWeekDays();

  // Close task menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTaskMenu) {
        setShowTaskMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTaskMenu]);

  const categories = [
    { name: "Budget Planning", color: "bg-[#6366F1]" },
    { name: "Financial Goal", color: "bg-[#10B981]" },
    { name: "Investment", color: "bg-[#F59E0B]" },
    { name: "Learning", color: "bg-[#EF4444]" },
    { name: "Review", color: "bg-[#8B5CF6]" },
    { name: "Other", color: "bg-[#6B7280]" }
  ];



  const deleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  const createTask = () => {
    if (!newTask.title.trim()) return;
    
    // Convert date to display format
    const taskDate = new Date(newTask.date);
    const displayDate = taskDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const taskData: InsertTask = {
      userId: "", // This will be set by the server
      title: newTask.title,
      description: newTask.description,
      date: displayDate,
      startTime: newTask.isAllDay ? undefined : newTask.startTime,
      endTime: newTask.isAllDay ? undefined : newTask.endTime,
      isAllDay: newTask.isAllDay,
      category: newTask.category,
      completed: false,
      color: categories.find(cat => cat.name === newTask.category)?.color || "bg-[#6366F1]"
    };

    createTaskMutation.mutate(taskData);
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
            <div className="w-10"></div>
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
                placeholder="e.g., Review monthly budget"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={newTask.date}
                onChange={(e) => setNewTask(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">All Day</label>
              <button
                type="button"
                onClick={() => setNewTask(prev => ({ 
                  ...prev, 
                  isAllDay: !prev.isAllDay,
                  startTime: !prev.isAllDay ? "" : prev.startTime,
                  endTime: !prev.isAllDay ? "" : prev.endTime
                }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 ${
                  newTask.isAllDay ? 'bg-[#6366F1]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    newTask.isAllDay ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Time */}
            {!newTask.isAllDay && (
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
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add details about your financial planning task..."
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
              disabled={createTaskMutation.isPending || !newTask.title.trim()}
              className="w-full py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg font-semibold text-lg disabled:opacity-50"
            >
              {createTaskMutation.isPending ? "Creating..." : "Create Task"}
            </Button>
            
            {/* Error Message */}
            {createTaskMutation.isError && (
              <div className="text-red-500 text-sm text-center mt-2">
                Failed to create task. Please try again.
              </div>
            )}
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
          <h1 className="text-xl font-semibold text-[#1F2937]">Financial Planner</h1>
          <div className="w-10"></div>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#1F2937]">
            {currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </h2>
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
                day === currentDate.getDate() 
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
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No upcoming tasks. Create your first task!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <Card 
                key={task._id} 
                className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white relative"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-16 ${task.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h4 className="font-semibold text-[#1F2937] text-sm">
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {task.isAllDay ? 'All Day' : task.startTime && task.endTime ? `${task.startTime} - ${task.endTime}` : 'No time set'}
                          </p>
                        </div>
                        {/* Task Menu Button */}
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTaskMenu(showTaskMenu === task._id ? null : task._id!);
                            }}
                            className="p-1 h-6 w-6"
                          >
                            <div className="flex flex-col gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </Button>
                          
                          {/* Dropdown Menu */}
                          {showTaskMenu === task._id && (
                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                              <button
                                onClick={() => {
                                  setSelectedTask(task);
                                  setShowTaskMenu(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <EditIcon className="h-4 w-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  deleteTask(task._id!);
                                  setShowTaskMenu(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                disabled={deleteTaskMutation.isPending}
                              >
                                <TrashIcon className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {task.date}
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.description || 'No description'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No Tasks Scheduled</h3>
            <p className="text-gray-400 mb-4">Create your first task to get started with planning!</p>
            <p className="text-sm text-gray-400">Tasks will be displayed here when available</p>
          </div>
        )}
      </main>



      {/* Bottom Navigation - Enhanced */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Dashboard */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/dashboard")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <HomeIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Dashboard</span>
          </Button>
          
          {/* Learning */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/search")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Learning</span>
          </Button>
          
          {/* Planner */}
          <Button variant="ghost" className="flex flex-col items-center gap-1 p-2 min-w-0">
            <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-[#6366F1] font-medium">Planner</span>
          </Button>
          
          {/* Gaming */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/gaming")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <GiftIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Gaming</span>
          </Button>
          
          {/* Settings */}
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 p-2 min-w-0"
            onClick={() => setLocation("/settings")}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Settings</span>
          </Button>
        </div>
      </div>

      {/* AI Chat Widget */}
      <ChatWidget 
        userContext={{
          username: user?.username,
          hasCompletedQuestionnaire: !!user,
          currentPage: "planner"
        }}
      />
    </div>
  );
};