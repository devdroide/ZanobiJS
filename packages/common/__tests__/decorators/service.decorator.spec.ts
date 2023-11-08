import { expect } from "chai";
import { DEPENDENCIES_CLASS } from "../../utils/constants";
import {
  ServiceMix,
  ServiceOnly,
  ServiceWithParameter,
  ServiceWithService,
} from "../mocks/services.mock";
describe("Commons - Decorator - service", () => {
  it("should respond an empty array of dependencies", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceOnly,
    );
    expect(dependenciesClass).to.be.an("array");
    expect(dependenciesClass).to.be.empty;
  });
  it("should respond an array with dependecies type controller", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceWithService,
    );
    // console.log(dependenciesClass);
    expect(dependenciesClass).to.be.an("array");
    expect(dependenciesClass).to.not.be.empty;
    expect(dependenciesClass[0]).to.include({ type: "Service" });
    expect(dependenciesClass[0]).to.include({ nameClass: "ServiceOnly" });
    expect(dependenciesClass[0]).to.include({
      nameClassContainer: "serviceOnly",
    });
    expect(dependenciesClass[0]).to.include({ nameParameter: "serviceOnly" });
    expect(dependenciesClass.length).to.be.equal(1);
  });
  it("should respond an array with dependecies as paramter", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceWithParameter,
    );
    // console.log(dependenciesClass);
    expect(dependenciesClass).to.be.an("array");
    expect(dependenciesClass).to.not.be.empty;
    expect(dependenciesClass[0]).to.include({ type: "Service" });
    expect(dependenciesClass[0]).to.include({ nameClass: "String" });
    expect(dependenciesClass[0]).to.include({
      nameClassContainer: "string",
    });
    expect(dependenciesClass[0]).to.include({ nameParameter: "userName" });
    expect(dependenciesClass.length).to.be.equal(1);
  });
  it("should respond an array with dependecies and additional @Inject", () => {
    const dependenciesClass = Reflect.getMetadata(
      DEPENDENCIES_CLASS,
      ServiceMix,
    );
    // console.log(dependenciesClass);
    expect(dependenciesClass).to.be.an("array");
    expect(dependenciesClass).to.not.be.empty;
    expect(dependenciesClass[1]).to.include({ type: "Service" });
    expect(dependenciesClass[1]).to.include({ nameClass: "String" });
    expect(dependenciesClass[1]).to.include({
      nameClassContainer: "string",
    });
    expect(dependenciesClass[1]).to.include({ nameParameter: "apiKey" });
    expect(dependenciesClass.length).to.be.equal(3);
  });
});
