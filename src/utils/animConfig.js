//animation configs & variants for framer motion ex. <motion.div variants={yAxisVariants}>Site Content</div>

//Easing Config
const easing = [0.175, 0.85, 0.42, 0.96];

//Easing animation Direction
export const yAxisVariants = {
    exit: { y: 150, opacity: 0, transition: { duration: 0.4, ease: easing } },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing
        }
    }
};

export const yAxisVariantsSlow = {
    exit: { y: 150, opacity: 0, transition: { duration: 0.4, ease: easing } },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: easing
        }
    }
};

export const yAxisVariantsSlower = {
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: easing
        }
    }
};
export const yAxisVariantsSlowest = {
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 3.2,
            ease: easing
        }
    }
};

export const xAxisVariants = {
    exit: { x: -250, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing
        }
    }
};

export const xAxisVariantsSlow = {
    exit: { x: -250, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.9,
            ease: easing
        }
    }
};

export const xAxisVariantsSlowFromRight = {
    exit: { x: 250, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.9,
            ease: easing
        }
    }
};

export const xAxisVariantsSlower = {
    exit: { x: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: easing
        }
    }
};

//Component Animation Configurations
export const articleAnimVariants = {
    hidden: { y: -5, opacity: 0.5 },
    visible: {
        y: 0,
        opacity: 1,
    },

};
