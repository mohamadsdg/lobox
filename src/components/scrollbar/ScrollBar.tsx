import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    height: "100%",
    marginTtop: "5px",
    marginBottom: "5px",
  },
  container: {
    overflow: "auto",
    height: "100%",
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  scrollTrack: {
    width: "13px",
    height: "100%",
    top: "0",
    bottom: "0",
    position: "absolute",
  },
  trackRight: {
    right: "-1px",
  },
  trackLeft: {
    left: "-1px",
  },
  scrollThumb: {
    marginRight: "4px",
    marginLeft: "4px",
    width: "4px",
    height: "20px",
    position: "absolute",
    borderRadius: "7px",
    opacity: " 0.8",
    top: "20px",
    cursor: "pointer",
    backgroundColor: "#d0d1d1",
  },
});

interface ScrollBarProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  placement?: "left" | "right";
  manualScrolling?: (ref: any) => void;
}

const ScrollBar: React.FC<ScrollBarProps> = ({
  children,
  className,
  placement,
  style,
  manualScrolling,
  ...otherProps
}) => {
  const classes = useStyles();
  const [hovering, setHovering] = React.useState(false);
  const [scrollBoxHeight, setScrollBoxHeight] = React.useState(20);
  const [scrollBoxTop, setScrollBoxTop] = React.useState(15);
  const [lastScrollThumbPosition, setScrollThumbPosition] = React.useState(0);
  const [isDragging, setDragging] = React.useState(false);
  const scrollHostRef = React.useRef<HTMLDivElement>(null);

  const handleMouseOver = React.useCallback(() => {
    if (!hovering) setHovering(true);
  }, [hovering]);

  const handleMouseOut = React.useCallback(() => {
    if (!!hovering) setHovering(false);
  }, [hovering]);

  const handleDocumentMouseUp = React.useCallback(
    (e: any) => {
      if (isDragging) {
        e.preventDefault();
        setDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = React.useCallback(
    (e: any) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement = scrollHostRef.current;
        const { scrollHeight, offsetHeight } =
          scrollHostElement as HTMLDivElement;

        const deltaY = e.clientY - lastScrollThumbPosition;
        const percentage = deltaY * (scrollHeight / offsetHeight);

        setScrollThumbPosition(e.clientY);
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        );
        (scrollHostElement as HTMLDivElement).scrollTop = Math.min(
          (scrollHostElement as HTMLDivElement).scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

  const handleScrollThumbMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setScrollThumbPosition(e.clientY);
      setDragging(true);
    },
    []
  );

  const handleScroll = React.useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    const scrollHostElement = scrollHostRef.current;
    const { scrollTop, scrollHeight, offsetHeight } =
      scrollHostElement as HTMLDivElement;
    let newTop = (scrollTop / scrollHeight) * offsetHeight + 15;
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollBoxTop(newTop);
  }, []);

  React.useEffect(() => {
    const scrollHostElement = scrollHostRef.current;
    (scrollHostElement as HTMLDivElement).addEventListener(
      "scroll",
      handleScroll,
      true
    );
    return () => {
      (scrollHostElement as HTMLDivElement).removeEventListener(
        "scroll",
        handleScroll,
        true
      );
    };
  }, []);

  React.useEffect(() => {
    const scrollHostElement = scrollHostRef.current;
    const { clientHeight, scrollHeight } = scrollHostElement as HTMLDivElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      scrollThumbPercentage * clientHeight,
      20
    );
    if (scrollThumbPercentage === 1) {
      setScrollBoxHeight(0);
    } else {
      setScrollBoxHeight(scrollThumbHeight);
    }
  }, [scrollHostRef.current?.scrollHeight]);

  React.useEffect(() => {
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  const handleManuall = useCallback(() => {
    return manualScrolling?.(scrollHostRef.current);
  }, [manualScrolling]);

  React.useEffect(() => {
    handleManuall();
  }, [handleManuall]);

  return (
    <div
      style={style}
      className={clsx(classes.root, className)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div ref={scrollHostRef} className={classes.container} {...otherProps}>
        {children}
      </div>
      <div
        className={clsx(
          classes.scrollTrack,
          placement == "right" ? classes.trackRight : classes.trackLeft
        )}
      >
        <div
          className={classes.scrollThumb}
          style={{ height: scrollBoxHeight, top: scrollBoxTop }}
          onMouseDown={handleScrollThumbMouseDown}
        />
      </div>
    </div>
  );
};

ScrollBar.defaultProps = {
  placement: "right",
};

export default ScrollBar;
