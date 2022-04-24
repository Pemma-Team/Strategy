/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Strategy, StrategyInterface } from "../Strategy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_farmToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aavePool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_uniRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_amm",
        type: "address",
      },
      {
        internalType: "address",
        name: "_futureVault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_pairID",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_leverage",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Allowance_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "Balance_Error",
    type: "error",
  },
  {
    inputs: [],
    name: "Invalid_Leverage_Value",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "checker",
    outputs: [
      {
        internalType: "bool",
        name: "canExec",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "execPayload",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "inputToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "invest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_leverage",
        type: "uint8",
      },
    ],
    name: "setLeverage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101c06040523480156200001257600080fd5b5060405162001e5438038062001e54833981016040819052620000359162000664565b620000403362000231565b6001600160a01b0389811660805288811660a052878116610100528681166101205285811661014052848116610160819052908416610180526101a08390526000805460ff60a01b1916600160a01b60ff85160217905560408051631e5f74a160e01b81529051631e5f74a1916004808201926020929091908290030181865afa158015620000d3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000f991906200071f565b6001600160a01b031660c0816001600160a01b031681525050610160516001600160a01b0316638cd8854f6040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000154573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200017a91906200071f565b6001600160a01b0390811660e052608051620001a791168860001962000281602090811b62000bb617901c565b620001d08660001960a0516001600160a01b03166200028160201b62000bb6179092919060201c565b620001f98460001960c0516001600160a01b03166200028160201b62000bb6179092919060201c565b620002228460001960e0516001600160a01b03166200028160201b62000bb6179092919060201c565b50505050505050505062000801565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b801580620002ff5750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015620002d7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002fd91906200073d565b155b620003775760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e63650000000000000000000060648201526084015b60405180910390fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b0390811663095ea7b360e01b17909152620003cf918591620003d416565b505050565b600062000430826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316620004b260201b62000d37179092919060201c565b805190915015620003cf578080602001905181019062000451919062000757565b620003cf5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016200036e565b6060620004c38484600085620004cd565b90505b9392505050565b606082471015620005305760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016200036e565b6001600160a01b0385163b620005895760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016200036e565b600080866001600160a01b03168587604051620005a79190620007ae565b60006040518083038185875af1925050503d8060008114620005e6576040519150601f19603f3d011682016040523d82523d6000602084013e620005eb565b606091505b509092509050620005fe82828662000609565b979650505050505050565b606083156200061a575081620004c6565b8251156200062b5782518084602001fd5b8160405162461bcd60e51b81526004016200036e9190620007cc565b80516001600160a01b03811681146200065f57600080fd5b919050565b60008060008060008060008060006101208a8c0312156200068457600080fd5b6200068f8a62000647565b98506200069f60208b0162000647565b9750620006af60408b0162000647565b9650620006bf60608b0162000647565b9550620006cf60808b0162000647565b9450620006df60a08b0162000647565b9350620006ef60c08b0162000647565b925060e08a015191506101008a015160ff811681146200070e57600080fd5b809150509295985092959850929598565b6000602082840312156200073257600080fd5b620004c68262000647565b6000602082840312156200075057600080fd5b5051919050565b6000602082840312156200076a57600080fd5b81518015158114620004c657600080fd5b60005b83811015620007985781810151838201526020016200077e565b83811115620007a8576000848401525b50505050565b60008251620007c28184602087016200077b565b9190910192915050565b6020815260008251806020840152620007ed8160408501602087016200077b565b601f01601f19169190910160400192915050565b60805160a05160c05160e05161010051610120516101405161016051610180516101a051611594620008c060003960006104e5015260006103be0152600061052b015260006103ed0152600081816108e101528181610de10152610e610152600061034d0152600050506000610462015260008181610157015281816101d801526109b801526000818161011d01528181610229015281816102d601528181610311015281816108aa0152818161090f0152610a4a01526115946000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063b9b8c2461161005b578063b9b8c246146100dc578063cf5303cf146100ef578063f2fde38b14610105578063fc0c546a1461011857600080fd5b8063614619541461008d578063715018a6146100975780638da5cb5b1461009f5780639ee2de8c146100c9575b600080fd5b61009561013f565b005b610095610652565b6000546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6100956100d7366004611235565b6106bd565b6100956100ea36600461126d565b610785565b6100f761093f565b6040516100c09291906112f1565b61009561011336600461130c565b610ad4565b6100ac7f000000000000000000000000000000000000000000000000000000000000000081565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156101a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ca9190611329565b9050801561021157610211817f000000000000000000000000000000000000000000000000000000000000000073a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48610d50565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610278573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029c9190611329565b60008054919250906102b9908390600160a01b900460ff16611358565b90506102fa8173a0b86991c6218b36c1d19d4a2e9eb0ce3606eb487f0000000000000000000000000000000000000000000000000000000000000000610d50565b60405163e8eda9df60e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015260248201839052306044830152600060648301527f0000000000000000000000000000000000000000000000000000000000000000169063e8eda9df90608401600060405180830381600087803b15801561039157600080fd5b505af11580156103a5573d6000803e3d6000fd5b50506040516311f9fbc960e21b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018590527f00000000000000000000000000000000000000000000000000000000000000001692506347e7ef249150604401600060405180830381600087803b15801561043357600080fd5b505af1158015610447573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a0823190602401602060405180830381865afa1580156104b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d69190611329565b604051633e7f74a360e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201819052600060248301819052600160448401819052939450926001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001692635dde4ba69291859187919082908790637cfee94690606401602060405180830381865afa158015610582573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a69190611329565b6105b09190611358565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e088901b168152600481019590955260248501939093526044840191909152606483015260848201523060a482015260c40160408051808303816000875af1158015610625573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106499190611377565b50505050505050565b6000546001600160a01b031633146106b15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6106bb6000610f29565b565b6000546001600160a01b031633146107175760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b60018160ff16108061072c5750600a8160ff16115b1561074a576040516320e482eb60e01b815260040160405180910390fd5b6000805460ff909216600160a01b027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff909216919091179055565b6040516370a0823160e01b815233600482015281906001600160a01b038416906370a0823190602401602060405180830381865afa1580156107cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ef9190611329565b101561080e57604051634a5b2a2560e11b815260040160405180910390fd5b604051636eb1769f60e11b815233600482015230602482015281906001600160a01b0384169063dd62ed3e90604401602060405180830381865afa15801561085a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087e9190611329565b101561089d576040516365321e6b60e01b815260040160405180910390fd5b6108d26001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333084610f91565b6109086001600160a01b0383167f0000000000000000000000000000000000000000000000000000000000000000600019610bb6565b61093381837f0000000000000000000000000000000000000000000000000000000000000000610d50565b61093b61013f565b5050565b60408051306024808301919091528251808303909101815260449091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16635cdc612360e11b17905260009064174876e8003a108015610abf57506040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610a07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2b9190611329565b1180610abf57506040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610a99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abd9190611329565b115b15610acc57600191509091565b600091509091565b6000546001600160a01b03163314610b2e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106a8565b6001600160a01b038116610baa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016106a8565b610bb381610f29565b50565b801580610c305750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e90604401602060405180830381865afa158015610c0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2e9190611329565b155b610ca25760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e63650000000000000000000060648201526084016106a8565b6040516001600160a01b038316602482015260448101829052610d3290849063095ea7b360e01b906064015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152610fcf565b505050565b6060610d4684846000856110b4565b90505b9392505050565b6040805160028082526060820183526000926020830190803683370190505090508281600081518110610d8557610d856113b1565b60200260200101906001600160a01b031690816001600160a01b0316815250508181600181518110610db957610db96113b1565b6001600160a01b03928316602091820292909201015260405163d06ca61f60e01b81526000917f0000000000000000000000000000000000000000000000000000000000000000169063d06ca61f90610e18908890869060040161140b565b600060405180830381865afa158015610e35573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610e5d9190810190611424565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166338ed17398683600181518110610ea257610ea26113b1565b602002602001015185304261012c610eba91906114e2565b6040518663ffffffff1660e01b8152600401610eda9594939291906114fa565b6000604051808303816000875af1158015610ef9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f219190810190611424565b505050505050565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040516001600160a01b0380851660248301528316604482015260648101829052610fc99085906323b872dd60e01b90608401610cce565b50505050565b6000611024826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610d379092919063ffffffff16565b805190915015610d3257808060200190518101906110429190611536565b610d325760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016106a8565b60608247101561112c5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016106a8565b6001600160a01b0385163b6111835760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016106a8565b600080866001600160a01b0316858760405161119f9190611558565b60006040518083038185875af1925050503d80600081146111dc576040519150601f19603f3d011682016040523d82523d6000602084013e6111e1565b606091505b50915091506111f18282866111fc565b979650505050505050565b6060831561120b575081610d49565b82511561121b5782518084602001fd5b8160405162461bcd60e51b81526004016106a89190611574565b60006020828403121561124757600080fd5b813560ff81168114610d4957600080fd5b6001600160a01b0381168114610bb357600080fd5b6000806040838503121561128057600080fd5b823561128b81611258565b946020939093013593505050565b60005b838110156112b457818101518382015260200161129c565b83811115610fc95750506000910152565b600081518084526112dd816020860160208601611299565b601f01601f19169290920160200192915050565b8215158152604060208201526000610d4660408301846112c5565b60006020828403121561131e57600080fd5b8135610d4981611258565b60006020828403121561133b57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561137257611372611342565b500290565b6000806040838503121561138a57600080fd5b505080516020909101519092909150565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600081518084526020808501945080840160005b838110156114005781516001600160a01b0316875295820195908201906001016113db565b509495945050505050565b828152604060208201526000610d4660408301846113c7565b6000602080838503121561143757600080fd5b825167ffffffffffffffff8082111561144f57600080fd5b818501915085601f83011261146357600080fd5b8151818111156114755761147561139b565b8060051b604051601f19603f8301168101818110858211171561149a5761149a61139b565b6040529182528482019250838101850191888311156114b857600080fd5b938501935b828510156114d6578451845293850193928501926114bd565b98975050505050505050565b600082198211156114f5576114f5611342565b500190565b85815284602082015260a06040820152600061151960a08301866113c7565b6001600160a01b0394909416606083015250608001529392505050565b60006020828403121561154857600080fd5b81518015158114610d4957600080fd5b6000825161156a818460208701611299565b9190910192915050565b602081526000610d4960208301846112c556fea164736f6c634300080a000a";

type StrategyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StrategyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Strategy__factory extends ContractFactory {
  constructor(...args: StrategyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Strategy";
  }

  deploy(
    _token: string,
    _farmToken: string,
    _aavePool: string,
    _uniRouter: string,
    _controller: string,
    _amm: string,
    _futureVault: string,
    _pairID: BigNumberish,
    _leverage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Strategy> {
    return super.deploy(
      _token,
      _farmToken,
      _aavePool,
      _uniRouter,
      _controller,
      _amm,
      _futureVault,
      _pairID,
      _leverage,
      overrides || {}
    ) as Promise<Strategy>;
  }
  getDeployTransaction(
    _token: string,
    _farmToken: string,
    _aavePool: string,
    _uniRouter: string,
    _controller: string,
    _amm: string,
    _futureVault: string,
    _pairID: BigNumberish,
    _leverage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token,
      _farmToken,
      _aavePool,
      _uniRouter,
      _controller,
      _amm,
      _futureVault,
      _pairID,
      _leverage,
      overrides || {}
    );
  }
  attach(address: string): Strategy {
    return super.attach(address) as Strategy;
  }
  connect(signer: Signer): Strategy__factory {
    return super.connect(signer) as Strategy__factory;
  }
  static readonly contractName: "Strategy";
  public readonly contractName: "Strategy";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StrategyInterface {
    return new utils.Interface(_abi) as StrategyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Strategy {
    return new Contract(address, _abi, signerOrProvider) as Strategy;
  }
}
