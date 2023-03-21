pragma solidity ^0.5.2;

import "./ERC20Token.sol";


contract MiniMeTokenInterface is ERC20Token {

    /**
     * @notice `msg.sender` approves `_spender` to send `_amount` tokens on
     *  its behalf, and then a function is triggered in the contract that is
     *  being approved, `_spender`. This allows users to use their tokens to
     *  interact with contracts in one function call instead of two
     * @param _spender The address of the contract able to transfer the tokens
     * @param _amount The amount of tokens to be approved for transfer
     * @return True if the function call was successful
     */
    function approveAndCall(
        address _spender,
        uint256 _amount,
        bytes calldata _extraData
    )
        external
        returns (bool success);

    /**
     * @notice Creates a new clone token with the initial distribution being
     *  this token at `_snapshotBlock`
     * @param _cloneTokenName Name of the clone token
     * @param _cloneDecimalUnits Number of decimals of the smallest unit
     * @param _cloneTokenSymbol Symbol of the clone token
     * @param _snapshotBlock Block when the distribution of the parent token is
     *  copied to set the initial distribution of the new clone token;
     *  if the block is zero than the actual block, the current block is used
     * @param _transfersEnabled True if transfers are allowed in the clone
     * @return The address of the new MiniMeToken Contract
     */
    function createCloneToken(
        string calldata _cloneTokenName,
        uint8 _cloneDecimalUnits,
        string calldata _cloneTokenSymbol,
        uint _snapshotBlock,
        bool _transfersEnabled
    )
        external
        returns(address);


    /**
     * @notice Enables token holders to transfer their tokens freely if true
     * @param _transfersEnabled True if transfers are allowed in the clone
     */
    function enableTransfers(bool _transfersEnabled) external;

    /**
     * @notice This method can be used by the controller to extract mistakenly
     *  sent tokens to this contract.
     * @param _token The address of the token contract that you want to recover
     *  set to 0 in case you want to extract ether.
     */
    function claimTokens(address _token) external;


    function deposit() public payable;
    function withdraw(uint wad) public;

    /**
     * @dev Queries the balance of `_owner` at a specific `_blockNumber`
     * @param _owner The address from which the balance will be retrieved
     * @param _blockNumber The block number when the balance is queried
     * @return The balance at `_blockNumber`
     */
    function balanceOfAt(
        address _owner,
        uint _blockNumber
    )
        public
        view
        returns (uint);

    /**
     * @notice Total amount of tokens at a specific `_blockNumber`.
     * @param _blockNumber The block number when the totalSupply is queried
     * @return The total amount of tokens at `_blockNumber`
     */
    function totalSupplyAt(uint _blockNumber) public view returns(uint);

}
