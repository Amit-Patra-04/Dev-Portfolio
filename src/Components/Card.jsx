import { motion } from "motion/react";

const Card = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-12 cursor-grab shadow-lg select-none touch-none"
      src={image}
      style={{ ...style, touchAction: 'none' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
    />
  ) : (
    <motion.div
      className="absolute px-4 py-2 text-xs font-bold text-center rounded-xl draggable-card w-auto min-w-[5rem] cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ ...style, touchAction: 'none' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
    >
      {text}
    </motion.div>
  );
};

export default Card;
