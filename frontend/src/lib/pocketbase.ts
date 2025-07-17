import PocketBase from "pocketbase";

const url = "https://spaceship.fly.dev";
export const pb = new PocketBase(url);
// const pb = new PocketBase(url);
// export default pb;
pb.autoCancellation(false); // gets rid of console error
