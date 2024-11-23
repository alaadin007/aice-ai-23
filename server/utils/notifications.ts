interface NotificationData {
  type: string;
  employerEmail?: string;
  message?: string;
}

export async function notifyStudent(
  studentId: string,
  data: NotificationData
): Promise<void> {
  // TODO: Implement notification system (email, in-app, etc.)
  console.log(`Notifying student ${studentId}:`, data);
}