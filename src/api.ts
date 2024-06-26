export const getCast = async (username: string, hash: string, options?: { customEndpoint?: string }) => {
  try {
    const res = await fetch(
      options?.customEndpoint
        ? `${options?.customEndpoint}/${username}/${hash}`
        : `https://farcaster.tv/${username}/${hash}`,
    );
    const cast = await res.json();

    // Find a cast with a matching hash or return the first cast if the matched cast is not found
    return cast.result.casts.find((c: any) => c.hash.includes(hash)) ?? cast.result.casts[0];
  } catch (e) {
    console.error(e);
    throw new Error(
      `Unable to fetch cast ${hash} by ${username}.${
        options?.customEndpoint &&
        " You are using a custom endpoint (" +
          options?.customEndpoint +
          "). Make sure it is correct and the server is running. For more info about the proxy server check the README."
      }`,
    );
  }
};
