/** @jsx jsx */
import { css, Global, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import {
  points,
  input,
  variadicSeries,
  statisticalSequence,
  max,
  min,
  range,
  mathExpectation,
  dispersion,
  meanSquare,
} from "../calc/main";
import { computeIntervals } from "../calc/intervals";
import * as Plot from "@observablehq/plot";
import { computeFixedMeanSquare } from "../calc/calculations";

const width = 1000;

const intervals = computeIntervals(input);

const textColor = "#bbaabb";
const textColorDark = "#363062";

const plotStyles = {
  backgroundColor: "transparent",
};

const FancyHeader = styled.h1({
  color: textColor,
  fontSize: "40px",
});

const Card = styled.div({
  backgroundColor: "#EEF5FF",
  borderRadius: "2rem",
  color: textColorDark,
  gap: "1rem",
  padding: "2rem",
});

const pointsFormatted = points.slice();
pointsFormatted.unshift({ value: points[0].value, probability: 0 });

export function App() {
  const empiricalFunctionPlot = useRef<HTMLDivElement>(null);
  const histogramPlot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const enhancedFunctionPoints = pointsFormatted.slice()
    enhancedFunctionPoints.push({value: max + 0.2, probability: 1})
    const plot = Plot.plot({
      style: plotStyles,
      width,
      aspectRatio: 0.5,
      marks: [
        // Plot.line(pointsFormatted, {
        //   x: "value",
        //   y: "probability",
        //   curve: "step-after",
        // }),
        Plot.arrow(enhancedFunctionPoints.slice(0, -1), {
          x1: "value",
          x2: (_, i) => enhancedFunctionPoints[i + 1]?.value,
          y1: "probability",
          y2: "probability",
        }),
        Plot.ruleY([0]),
      ],
    });

    empiricalFunctionPlot.current?.appendChild(plot);

    return () => plot.remove();
  }, [empiricalFunctionPlot]);

  useEffect(() => {
    const plot = Plot.plot({
      style: plotStyles,
      width,
      marks: [
        Plot.rect(intervals, {
          x1: (d) => d.range.start,
          y1: 0,
          x2: (d) => d.range.end,
          y2: (d) => d.value,
          stroke: "currentColor",
          fill: "#164863",
        }),
        Plot.line(intervals, {
          x: (d) => (d.range.end - d.range.start) / 2 + d.range.start,
          y: "value",
          stroke: "#FF9130",
          strokeWidth: 5,
        }),
      ],
    });

    histogramPlot.current?.append(plot);

    return () => plot.remove();
  }, [histogramPlot]);

  const pointsWithZero = points.slice()
  pointsWithZero.unshift({value: -Infinity, probability: 0})

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <Global
        styles={{
          padding: 0,
          margin: 0,
          border: 0,
          outline: 0,
          fontSize: "16px",
          boxSizing: "border-box",
          body: {
            backgroundColor: "#1b1b1f",
            color: textColor,
          },
        }}
      />

      <FancyHeader>Исходные данные</FancyHeader>
      <Card
        css={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "23rem",
          textAlign: "center",
          gap: "3rem",
        }}
      >
        {input.map((value) => (
          <span>{value}</span>
        ))}
      </Card>
      <FancyHeader>Вариационный ряд</FancyHeader>
      <Card
        css={{
          display: "flex",
          padding: "2rem",
        }}
      >
        {variadicSeries.map((value) => {
          return <span>{value}</span>;
        })}
      </Card>
      <FancyHeader>Статистический ряд</FancyHeader>
      <Card
        css={{
          display: "flex",
          padding: "2rem",
        }}
      >
        {statisticalSequence.map((value) => {
          return (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <span>{value.value}</span>
              <span>{value.count}</span>
            </div>
          );
        })}
      </Card>
      <FancyHeader>Диапазон</FancyHeader>
      <svg width="200mm" height="100mm" viewBox="0 0 200 100">
        <g id="layer1">
          <rect
            css={css`
              fill: #eef5ff;
              fill-opacity: 1;
              stroke: none;
              stroke-width: 1.6;
              stroke-linejoin: round;
              stroke-dashoffset: 6.04724;
            `}
            id="rect2"
            width="50"
            height="10"
            x="75"
            y="45"
            ry="1.1618268"
          />
          <circle
            css={css`
              fill: #eef5ff;
              fill-opacity: 1;
              stroke: none;
              stroke-width: 1.6;
              stroke-linejoin: round;
              stroke-dashoffset: 6.04724;
            `}
            id="path1"
            cx="60"
            cy="50"
            r="18.243244"
          />
          <circle
            css={css`
              fill: #eef5ff;
              fill-opacity: 1;
              stroke: none;
              stroke-width: 1.6;
              stroke-linejoin: round;
              stroke-dashoffset: 6.04724;
            `}
            id="path1-5"
            cx="140"
            cy="50"
            r="18.243244"
          />
          <text
            id="text4-9"
            x="140"
            y="50"
            textAnchor="middle"
            fontSize="10px"
            alignmentBaseline="middle"
            css={css`
              fill: #363062;
              stroke: none;
            `}
          >
            {max}
          </text>
          <text
            x="60"
            y="50"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="10px"
            id="text4"
            css={css`
              fill: #363062;
              stroke: none;
            `}
          >
            {min}
          </text>
          <text
          x="100"
          y="51"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="7px"
          css={css`fill: #363062;`}
          >{range}</text>
        </g>
      </svg>
      <FancyHeader>Характеристики</FancyHeader>
      <Card css={{
        display: "flex",
        flexDirection: "column",
      }}>
        <span>Математическое ожидание: {mathExpectation.toFixed(6)}</span>
        <span>Дисперсия: {dispersion.toFixed(6)}</span>
        <span>Среднее-квадратичное: {meanSquare.toFixed(6)}</span>
        <span>Исправленное среднее-квадратичное: {computeFixedMeanSquare(dispersion, input.length).toFixed(6)}</span>
      </Card>
      <FancyHeader>Эмпирическая функция распределения в аналитическом виде</FancyHeader>
      <Card css={{display: "flex", flexDirection: "column"}}>
      {
        pointsWithZero.map((point, index, points) => <span>{point.probability} при x [{points[index]?.value == -Infinity ? "-Inf" : point.value}; {index == points.length - 1 ? "+Inf" : points[index + 1].value})</span>)
      }
      </Card>
      <FancyHeader>Эмпирическая функция распределения</FancyHeader>
      <div ref={empiricalFunctionPlot}></div>
      <FancyHeader>Гистограмма</FancyHeader>
      <div ref={histogramPlot}></div>
    </div>
  );
}
