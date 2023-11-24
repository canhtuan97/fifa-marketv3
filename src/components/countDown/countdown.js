import React, { useEffect } from "react";
import "./countdown.css";
import styled from "styled-components";

const Wrapper = styled.div`
  //   margin-top: 130px;
  @media (max-width: 576px) {
    // margin-top: 120px;
  }
`;

export const CountDown = () => {
  const handle = () => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "07/15/",
      birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / day);
        document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        );
        document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        );
        document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        );

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("countdown").style.display = "none";
          clearInterval(x);
        }
        //seconds
      }, 0);
  };

  useEffect(() => {
    handle();
  }, []);

  return (
    <Wrapper className="mx-auto container countdown">
      <ul className="text-nowrap d-flex justify-content-center px-0">
        <li className="cd-li text-center" style={{ backgroundColor: "#86c540" }}>
          <span id="days"></span>&nbsp; &nbsp; Days &nbsp; &nbsp;
        </li>
        <li className="cd-li" style={{ backgroundColor: "#86c540" }}>
          <span id="hours"></span>&nbsp; Hours &nbsp;
        </li>
        <li className="cd-li" style={{ backgroundColor: "#86c540" }}>
          <span id="minutes"></span>Minutes
        </li>
        <li className="cd-li" style={{ backgroundColor: "#86c540" }}>
          <span id="seconds"></span>Seconds
        </li>
      </ul>
    </Wrapper>
  );
};
