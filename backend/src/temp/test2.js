const stats = await container.stats({
    stream: false,
});

console.log(
    stats.memory_stats?.usage
);