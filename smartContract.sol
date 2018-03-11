pragma solidity ^0.4.0;

contract Proof {
    struct FileDetails {
        uint timestamp;
        string owner;
    }

    mapping (string => FileDetails) files;

    event logFileAddedStatus (bool status, uint timestamp, string owner, string fileHash);

    /* This is used to store the owner of the file at the block timestamp. */
    function set (string owner, string fileHash)
    {
        /* There is no proper way of checking whether the key already exists or not,
        therefore we are checking the default value i.e. all bit == 0.*/
        if (files[fileHash].timestamp == 0)
        {
            files[fileHash] = FileDetails(block.timestamp, owner);
            /* We are triggering the event so that our front-end knows that file's existance
            and ownership details have been stored. */
            logFileAddedStatus(true, block.timestamp, owner, fileHash);
        }
        else
        {
            /*This informs us (front-end) that the file's existance and ownership details
            couldn't be stored because they have already been stored earlier */
            logFileAddedStatus(false, block.timestamp, owner, fileHash);
        }
    }

    /*This function is used to get information*/
    function get(string fileHash) returns (uint timestamp, string owner)
    {
        return (files[fileHash].timestamp, files[fileHash].owner);
    }
}
