import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Student {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  course: string;
  department: string;
  created_at: string;
}

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("students-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "students",
        },
        () => {
          fetchStudents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (error: any) {
      toast.error("Failed to load students", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      "computer-science": "bg-primary/10 text-primary",
      engineering: "bg-accent/10 text-accent",
      business: "bg-secondary text-secondary-foreground",
      arts: "bg-muted text-muted-foreground",
      sciences: "bg-primary/20 text-primary",
    };
    return colors[department] || "bg-secondary text-secondary-foreground";
  };

  if (loading) {
    return (
      <Card className="w-full shadow-[var(--shadow-card)]">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="text-2xl">Registered Students</CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No students registered yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date of Birth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.student_id}</TableCell>
                    <TableCell>
                      {student.first_name} {student.last_name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Badge className={getDepartmentColor(student.department)} variant="secondary">
                        {student.department.split("-").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{student.course}</TableCell>
                    <TableCell>{formatDate(student.date_of_birth)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
