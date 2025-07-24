import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskAPI } from "@/lib/taskAPI";
import type { Task } from "@shared/schema";
import { 
  ArrowLeftIcon, 
  TrendingUpIcon, 
  CalendarIcon, 
  TrashIcon,
  AlertTriangleIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GoalsSummaryPage = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch tasks from API
  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: () => taskAPI.getTasks(),
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: taskAPI.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Task Deleted",
        description: "The task has been removed from your planner.",
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete all tasks mutation
  const deleteAllTasksMutation = useMutation({
    mutationFn: async () => {
      const tasks = tasksData?.tasks || [];
      await Promise.all(tasks.map(task => taskAPI.deleteTask(task._id!)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "All Tasks Deleted",
        description: "Your planner history has been cleared.",
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete all tasks. Please try again.",
        variant: "destructive",
      });
    }
  });

  const allTasks = tasksData?.tasks || [];
  const sortedTasks = allTasks.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime || '00:00'}`);
    const dateB = new Date(`${b.date} ${b.startTime || '00:00'}`);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
    setShowDeleteConfirm(null);
  };

  const handleDeleteAll = () => {
    deleteAllTasksMutation.mutate();
    setShowDeleteConfirm(null);
  };

  return (
    <div className="bg-[#F8F9FF] min-h-screen w-full mobile-status-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/settings")}
            className="p-2 text-gray-600"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#1F2937]">Goals Summary</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-6">
        {/* Summary Stats */}
        <Card className="border-2 border-gray-100 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <TrendingUpIcon className="h-6 w-6 text-[#4157ff]" />
              Planner Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{allTasks.length}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {allTasks.filter(task => new Date(`${task.date} ${task.startTime || '00:00'}`) < new Date()).length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks History */}
        <Card className="border-2 border-gray-100 shadow-sm mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-['Poppins'] text-lg text-[#242424] flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-[#4157ff]" />
              Planner History
            </CardTitle>
            {allTasks.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm('all')}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading tasks...</p>
              </div>
            ) : sortedTasks.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No Tasks Found</h3>
                <p className="text-gray-400 mb-4">Your planner history will appear here once you create tasks.</p>
                <Button
                  onClick={() => setLocation("/planner")}
                  className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 rounded-lg"
                >
                  Go to Planner
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1F2937] text-sm mb-1">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">
                        {task.date} • {task.isAllDay ? 'All Day' : `${task.startTime} - ${task.endTime}`}
                      </p>
                      <p className="text-xs text-gray-600">{task.category}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(task._id!)}
                      className="text-red-600 border-red-200 hover:bg-red-50 ml-4"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangleIcon className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {showDeleteConfirm === 'all' ? 'Delete All Tasks?' : 'Delete Task?'}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                {showDeleteConfirm === 'all' 
                  ? 'This will permanently delete all tasks from your planner history. This action cannot be undone.'
                  : 'This will permanently delete this task from your planner. This action cannot be undone.'
                }
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => showDeleteConfirm === 'all' ? handleDeleteAll() : handleDeleteTask(showDeleteConfirm)}
                  disabled={deleteTaskMutation.isPending || deleteAllTasksMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {(deleteTaskMutation.isPending || deleteAllTasksMutation.isPending) ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};