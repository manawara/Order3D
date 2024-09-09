"use client";
import { useRef, useState } from "react";
import { CircleEllipsis, Delete, DeleteIcon, Edit, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hook/useOnClickOutside";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "@/action/order";
const DropDownDetails = ({ id }: { id: number | string | null }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return deleteOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  const handleOpenDropDown = () => {
    setOpen((prev) => !prev);
  };

  const handleDeleteOrder = (id: number) => {
    mutation.mutate(id);

    setOpen(false);
  };

  return (
    <div
      className="relative top-0 left-0 flex justify-center"
      ref={dropdownRef}
    >
      <button onClick={handleOpenDropDown}>
        <CircleEllipsis />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: -10,
                opacity: 0,
              }}
              className="absolute top-7 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-greenLight mx-auto"
            />
            <motion.div
              className="absolute top-9 p-2 bg-greenLight z-20 rounded-md"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: -10,
                opacity: 0,
              }}
            >
              <ul>
                <li className="py-1">
                  <Link
                    href={`/dashboard/orders/view/${id}`}
                    className="flex items-center gap-2"
                  >
                    <Eye size={15} />
                    Wyświetl
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    href={`/dashboard/orders/edit/${id}`}
                    className="flex items-center gap-2"
                  >
                    <Edit size={15} />
                    Edit
                  </Link>
                </li>
                <li className="py-1">
                  <button
                    onClick={() => handleDeleteOrder(id as number)}
                    className="flex items-center gap-2"
                  >
                    <Delete size={15} />
                    Usuń
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownDetails;
