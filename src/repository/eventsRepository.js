import { Events } from "../models/events.js";
import { User } from "../models/users.js";

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

export async function unregisterMember(eventId, userId) {
  const [updatedEvent] = await Promise.all([
    Events.findByIdAndUpdate(
      eventId,
      { $pull: { participants: userId } },
      { new: true }
    ),
    User.findByIdAndUpdate(
      userId,
      { $pull: { events: eventId } }
    )
  ]);
  return updatedEvent;
}
// s'enregistrer à un évènement 

export async function enregistrement(eventId, userId) {
  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { events: eventId } }
  );
  return Events.findByIdAndUpdate(
    eventId,
    { $addToSet: { participants: userId } },
    { new: true }
  );
}

// on permet à l'admin de voir la liste des participants

export const getEventBParticipants =  async (eventId) => {
  try {
    return await Events.findById(eventId).populate ({
      path: 'participants',
      select: 'lastname firstname mail'
    });
     
  }catch (error){
    throw new Error ("Erreur lors de la lrécupération de la liste");
  }
}

// POUR TON DASHBOARD ADMIN (Récupérer TOUS les événements)
export const getEvents = async (filter, projection) => {
  try {
    // On applique le filtre, la projection, et on POPULATE pour avoir les noms
    return await Events.find(filter, projection).populate({
        path: 'participants',
        select: 'lastname firstname mail'
    });
  } catch (error) {
    throw new Error("Erreur lors de la récupération des événements");
  }
};