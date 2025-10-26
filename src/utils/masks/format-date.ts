import { format } from "date-fns";

function formatDate(timestamp: string | undefined): string {
  if (timestamp) {
    const date = format(timestamp, "MM/dd/yyyy - HH:mm");
    return date;
  } else {
    return "";
  }
}

export { formatDate };
