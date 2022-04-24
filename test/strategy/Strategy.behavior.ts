import { expect } from "chai";

export function shouldExecuteStrategy(): void {
  it("should return the new greeting once it's changed", async function () {
    expect(await this.strategy.connect(this.signers.admin).invest()).to.equal("");
  });
}
