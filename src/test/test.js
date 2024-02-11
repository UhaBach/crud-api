import test from "node:test";
import { describe, it } from "node:test";
import assert from "node:assert";
import http from "http";
import { createUser, getAllUsers, getConcreteUser } from "./requests.js";

describe("Api tests", async () => {
    await describe("Test script 1", async () => {
        let userId;
        await it("Get all users", async () => {
            const response = await getAllUsers();
            assert.equal(response.length, 0);
        });
        await it("Create user", async () => {
            const response = await createUser();
            if (
                Object.hasOwn(response, "username") 
                && Object.hasOwn(response, "age") 
                && Object.hasOwn(response, "hobbies")
                && Object.hasOwn(response, "id")
            ) {
                userId = response.id;
                assert.ok(true);
            }
        });
        await it("Get concrete user", async () => {
            const response = await getConcreteUser(userId);
            if (
                Object.hasOwn(response, "username") 
                && Object.hasOwn(response, "age") 
                && Object.hasOwn(response, "hobbies")
                && Object.hasOwn(response, "id")
            ) {
                console.log(response);
                assert.ok(true);
            }
        });
    });
});