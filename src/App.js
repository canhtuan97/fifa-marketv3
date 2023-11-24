import React from "react";
import { useSelector, useDispatch } from "react-redux";
// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// hooks
import useAuth from "./hooks/useAuth";
// components
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import ThemeLocalization from "./components/ThemeLocalization";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import LoadingScreen, { ProgressBarStyle } from "./components/LoadingScreen";
import "./App.css";
import BoxDiamond from "./components/animations/BoxDiamond";
import BoxGold from "./components/animations/BoxGold";
import BoxPlatium from "./components/animations/BoxPlatium";
import TheBai from "./components/animations/TheBaiStandard";

import { ANIMATION } from "./const/const";
import { setAnimation, setIsCompleted } from "./redux/slices/animation";

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();
  const { currentAnimation, skins, totalRepeat } = useSelector(
    (state) => state.animation
  );
  const dispatch = useDispatch();

  const handleCompleteAnimation = () => {
    dispatch(setAnimation(""));
    dispatch(setIsCompleted(true));
  };

  const renderAnimation = () => {
    switch (currentAnimation) {
      case ANIMATION.DIAMOND:
        return (
          <BoxDiamond
            onComplete={handleCompleteAnimation}
            totalRepeat={totalRepeat}
          />
        );
      case ANIMATION.GOLD:
        return (
          <BoxGold
            onComplete={handleCompleteAnimation}
            totalRepeat={totalRepeat}
          />
        );
      case ANIMATION.PLATIUM:
        return (
          <BoxPlatium
            onComplete={handleCompleteAnimation}
            totalRepeat={totalRepeat}
          />
        );
      default:
        return (
          <TheBai
            onComplete={handleCompleteAnimation}
            animation={currentAnimation.toLowerCase()}
            skins={skins}
          />
        );
    }
  };

  if (currentAnimation) return renderAnimation();
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <GlobalStyles />
              <ProgressBarStyle />
              <BaseOptionChartStyle />
              {/* <Settings /> */}
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
