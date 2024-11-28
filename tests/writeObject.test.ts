import { writeObject } from "../src/lib/gcp";
import { readFile } from "fs/promises"
import { test, expect } from "vitest";

test("gcsUpload", async () => {
    const file = await readFile("./hackathonjpg.jpg");
    await writeObject(file);
    console.log("done");
    //idk how to test this it doesnt even return anything;
    expect(true).toBe(true);
})