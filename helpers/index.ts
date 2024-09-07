import { StatusOrder } from "@prisma/client";

export const chooseOrder = (option: string) => {
  switch (option) {
    case "Do zrobienia":
      return StatusOrder.TODO;
    case "W toku":
      return StatusOrder.INPROGRESS;
    case "Zrealizowane":
      return StatusOrder.DONE;
  }
};

export const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    console.error("Nieprawidłowy format daty");
    return "Nieprawidłowa data";
  }
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
