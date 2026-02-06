import { Events } from "../models/events.js";
import { Member } from "../models/member.js";

export async function getEvents(filter = {}, projection = null) {
  return Events.find(filter, projection);
}

export async function createEvent(data) {
  return Events.create(data);
}

export async function getEventById(id) {
  return Events.findById(id);
}

export async function updateById(id, data) {
  return Events.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteEvent(id) {
  return Events.findByIdAndDelete(id);
}

export async function unregisterMember (eventId, userId) {
  const [updatedEvent] = await Promise.all([
    Events.findByIdAndUpdate(
      eventId,
      {$pull : {participants : userId}},
      {new : true}
    ),
    Member.findByIdAndUpdate(
      userId,
      {$pull:{events: eventsID}}
    )
  ]);
  }
  // s'enregistrer à un évènement 

  export async function enregistrement(eventId, userId) {
    await userId.findByIdAndUpdate(
      userId,
      {$addToSet: { Events : eventId}}
    );
    return Events.findByIdAndUpdate(
      eventId,
      {$addToSet: {participants: userId}},
      {new : true}
    );
  }
  


