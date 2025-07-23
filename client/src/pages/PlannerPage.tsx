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
  CheckIcon,
  XIcon,
  HomeIcon,
  MessageSquareIcon,
  UserIcon
} from "lucide-react";



export const PlannerPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

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
        category: "Design"
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

  // Toggle task completion mutation
  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      taskAPI.toggleTask(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

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

  const toggleTaskCompletion = (taskId: string) => {
    const task = allTasks.find(t => t._id === taskId);
    if (task) {
      toggleTaskMutation.mutate({ id: taskId, completed: !task.completed });
    }
  };

  const deleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  const createTask = () => {
    if (!newTask.title.trim()) return;
    
    const taskData: InsertTask = {
      userId: "", // This will be set by the server
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
                className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-16 ${task.color} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h4 className="font-semibold text-[#1F2937] text-sm">
                            Progress
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            More
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTaskCompletion(task._id!)}
                            className="p-1 h-6 w-6"
                            disabled={toggleTaskMutation.isPending}
                          >
                            {task.completed ? (
                              <CheckIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 border-2 border-gray-300 rounded"></div>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTask(task._id!)}
                            className="p-1 h-6 w-6"
                            disabled={deleteTaskMutation.isPending}
                          >
                            <TrashIcon className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium text-[#1F2937] mb-1">
                        Design Changes
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        2 Day Ago
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.title}
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