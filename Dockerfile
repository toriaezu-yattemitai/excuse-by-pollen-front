FROM oven/bun:1

WORKDIR /app
COPY . .
RUN bun install
EXPOSE 3000
CMD ["/bin/sh", "-c", "if [ \"$WATCHPACK_POLLING\" = \"true\" ]; then bun dev --webpack; else bun dev; fi"]