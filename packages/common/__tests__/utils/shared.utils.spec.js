"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const shared_utils_1 = require("../../utils/shared.utils");
describe("Commons - Utils - shared utils", () => {
    it("should respond is function", () => {
        const myFunction = function () { };
        (0, chai_1.expect)((0, shared_utils_1.isFunction)(myFunction)).to.be.true;
    });
    it("should respond is class", () => {
        class AnService {
        }
        (0, chai_1.expect)((0, shared_utils_1.isClass)(AnService)).to.be.true;
    });
    it("should respond is object", () => {
        const myObject = {};
        (0, chai_1.expect)((0, shared_utils_1.isObject)(myObject)).to.be.true;
    });
    it("should respond is array", () => {
        const myArray = [];
        (0, chai_1.expect)((0, shared_utils_1.isArray)(myArray)).to.be.true;
    });
    it("should respond is map", () => {
        const myMap = new Map();
        (0, chai_1.expect)((0, shared_utils_1.isMap)(myMap)).to.be.true;
    });
    it("should respond is null", () => {
        (0, chai_1.expect)((0, shared_utils_1.isNull)(null)).to.be.true;
    });
    it("should respond is undefined", () => {
        (0, chai_1.expect)((0, shared_utils_1.isUndefined)(undefined)).to.be.true;
    });
    it("should return true for empty objects", () => {
        (0, chai_1.expect)((0, shared_utils_1.isEmpty)({})).to.be.true;
    });
    it("should return false for non-empty objects", () => {
        (0, chai_1.expect)((0, shared_utils_1.isEmpty)({ a: 1 })).to.be.false;
        (0, chai_1.expect)((0, shared_utils_1.isEmpty)({ a: 1, b: 2 })).to.be.false;
    });
    it("should return true for empty arrays", () => {
        (0, chai_1.expect)((0, shared_utils_1.isEmpty)([])).to.be.true;
    });
    it("should return false for non-empty arrays", () => {
        (0, chai_1.expect)((0, shared_utils_1.isEmpty)([1, 2, 3])).to.be.false;
        (0, chai_1.expect)((0, shared_utils_1.isEmpty)(["a"])).to.be.false;
    });
});
