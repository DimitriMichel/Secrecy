import React, { useState } from "react";
import { Spinner } from "evergreen-ui";
import { AnimatePresence, motion } from "framer-motion";
import { yAxisVariantsSlower } from "../pages/utils/animConfig";

export const Watchlist = () => {
  const [isLoading, setLoading] = useState(false);
  return isLoading ? (
    <Spinner />
  ) : (
    <AnimatePresence>
      <motion.div variants={yAxisVariantsSlower}>
        This is the Watchlist page
      </motion.div>
    </AnimatePresence>
  );
};
