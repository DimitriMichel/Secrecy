import React, { useState } from "react";
import { Spinner } from "evergreen-ui";
import { AnimatePresence, motion } from "framer-motion";
import { yAxisVariantsSlower } from "../utils/animConfig";

export const Home = () => {
  const [isLoading, setLoading] = useState(false);
  return isLoading ? (
    <Spinner />
  ) : (
    <AnimatePresence>
      <div className="content-header">
        <motion.h2
          style={{ display: "inline-block" }}
          animate={{ y: -10, opacity: 1}}
          transition={{ duration: 0.2 }}
        >
          Home
        </motion.h2><br/>
        <motion.button className='button'
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1 }}
        >
          Next
        </motion.button>
      </div>
    </AnimatePresence>
  );
};
