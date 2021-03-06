import { Address, BigInt, Bytes, store } from "@graphprotocol/graph-ts";
import { DAO, Proposal, Vote } from "../types/schema";

function getVote(id: string): Vote {
  let vote = store.get("Vote", id) as Vote;
  if (vote == null) {
    vote = new Vote(id);
  }
  return vote;
}

function saveVote(vote: Vote): void {
  store.set("Vote", vote.id, vote);
}

export function insertNewVote(
  eventId: string,
  createdAt: BigInt,
  avatarAddress: Address,
  proposalId: Bytes,
  voter: Address,
  amount: BigInt
): Vote {
  let vote = getVote(eventId);
  vote.createdAt = createdAt;
  vote.voter = voter;
  vote.proposal = store.get("Proposal", proposalId.toHex()) as Proposal;
  vote.dao = store.get("DAO", avatarAddress.toHex()) as DAO;
  vote.reputation = amount;
  saveVote(vote);
}
