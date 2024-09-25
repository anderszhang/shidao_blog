---
title: WebComponent
article: false
date: 2024-07-19
category:
  - 大数据
tag:
  - Flink，waterMark
---

watermarks 的作用 — 它们定义何时停止等待较早的事件。

Flink 中事件时间的处理取决于 watermark 生成器，后者将带有时间戳的特殊元素插入流中形成 watermarks。事件时间 t 的 watermark 代表 t 之前（很可能）都已经到达。

当 watermark 以 2 或更大的时间戳到达时，事件流的排序器应停止等待，并输出 2 作为已经排序好的流。