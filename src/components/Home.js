import React, { useState, useEffect } from "react";
import { Spinner } from "evergreen-ui";
import { motion } from "framer-motion";
import Status from "./Status";
import { articleAnimVariants } from "../utils/animConfig";
export const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState(null);

  useEffect(() => {
    fetch(`https://us-east1-hanover-c2d8f.cloudfunctions.net/api/statuses`)
      .then((response) => response.json())
      .then((response) => {
        setStatuses(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const statusList = isLoading ? (
    <div className="spinner">
      <Spinner />
    </div>
  ) : (
    statuses.map((status) => (
      <div key={status.statusID}  className="status-list-item">
        <Status status={status} />
      </div>
    ))
  );
  return isLoading ? (
    <div className="spinner">
      <Spinner />
    </div>
  ) : (
    <div>
      <div>
        <motion.h2
          className="page-title"
          style={{ display: "inline-block" }}
          animate={{ y: [10, 0], opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Home
        </motion.h2>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={articleAnimVariants}
        className="statuses"
      >
        {statusList}
      </motion.div>
    </div>
  );
};
