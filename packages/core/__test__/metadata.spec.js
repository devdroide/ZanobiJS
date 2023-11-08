"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const metadata_1 = require("../metadata");
const classModule_mock_1 = require("./mocks/classModule.mock");
const classWithDependeciesInject_mock_1 = require("./mocks/classWithDependeciesInject.mock");
const classWithDependeciesClass_mock_1 = require("./mocks/classWithDependeciesClass.mock");
describe("Core - metadata", () => {
    class genericClassForTesting {
    }
    const metadata = metadata_1.Metadata.getInstance();
    describe("Is Type", () => {
        it("should respond false to is module", () => {
            (0, chai_1.expect)(metadata.isTypeModule(genericClassForTesting)).to.be.false;
        });
        it("should respond false to is imports", () => {
            (0, chai_1.expect)(metadata.isTypeImport(genericClassForTesting)).to.be.false;
        });
        it("should respond false to is controllers", () => {
            (0, chai_1.expect)(metadata.isTypeController(genericClassForTesting)).to.be.false;
        });
        it("should respond false to is services", () => {
            (0, chai_1.expect)(metadata.isTypeService(genericClassForTesting)).to.be.false;
        });
        it("should respond false to is exports", () => {
            (0, chai_1.expect)(metadata.isTypeExports(genericClassForTesting)).to.be.false;
        });
        it("should respond true to is module", () => {
            (0, chai_1.expect)(metadata.isTypeModule(classModule_mock_1.ModuleTestEmpty)).to.be.true;
        });
        it("should respond determine type of service", () => {
            (0, chai_1.expect)(metadata.determineType(classWithDependeciesInject_mock_1.ServiceWithDepenParam)).to.be.equal("service");
        });
        it("should respond determine type of unknown", () => {
            class ServiceTest {
            }
            try {
                metadata.determineType(ServiceTest);
            }
            catch (error) {
                (0, chai_1.expect)(error.message).to.be.equal("ServiceTest type is unknown");
            }
        });
    });
    describe("Get Metadata", () => {
        it("Should respond the metadata of the decorator module", () => {
            const metadata2 = metadata_1.Metadata.getInstance();
            const resultMetadata = metadata2.getMetadataModule(classModule_mock_1.ModuleTest);
            (0, chai_1.expect)(resultMetadata).to.have.property("imports");
            (0, chai_1.expect)(resultMetadata).to.have.property("controllers");
            (0, chai_1.expect)(resultMetadata).to.have.property("services");
            (0, chai_1.expect)(resultMetadata).to.have.property("exports");
        });
        it("should respond the dependency metadata of a controller", () => {
            const resultMetadata = metadata.getAllDependencies(classWithDependeciesClass_mock_1.ControllerWithDepenClass);
            (0, chai_1.expect)(resultMetadata).to.have.property("dClass");
            (0, chai_1.expect)(resultMetadata).to.have.property("dParam");
            (0, chai_1.expect)(resultMetadata).to.have.property("dInject");
            (0, chai_1.expect)(resultMetadata.dInject).to.be.empty;
        });
        it("should respond the dependency metadata of a service", () => {
            const resultMetadata = metadata.getAllDependencies(classWithDependeciesInject_mock_1.ServiceWithDepenParam);
            (0, chai_1.expect)(resultMetadata).to.have.property("dClass");
            (0, chai_1.expect)(resultMetadata).to.have.property("dParam");
            (0, chai_1.expect)(resultMetadata).to.have.property("dInject");
            (0, chai_1.expect)(resultMetadata.dInject).to.not.be.empty;
        });
    });
    describe("", () => { });
});
