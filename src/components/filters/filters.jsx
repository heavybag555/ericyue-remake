"use client";
import { motion } from "framer-motion";

const Filters = ({
  onSelectFilter,
  activeFilter,
  opacityAnimation,
  setFiltersVisible,
}) => {
  const categories = ["Editorial", "Photography", "Music"];

  return (
    <motion.ul
      className="relative max-lg:mb-4"
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
    >
      <li className="absolute flex flex-col items-end right-0 max-lg:relative">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`normal-txt text-end hover:opacity-50 ${
              activeFilter === cat ? "opacity-50" : ""
            }`}
            onClick={() => {
              onSelectFilter(cat);
              setFiltersVisible(false);
            }}
          >
            {cat}
          </button>
        ))}
      </li>
    </motion.ul>
  );
};
export default Filters;
