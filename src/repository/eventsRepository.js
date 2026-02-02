import { Events } from "../models/events.js";

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
  return Events.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );
}

export async function deleteEvent(id) {
  return Events.findByIdAndDelete(id);
}
