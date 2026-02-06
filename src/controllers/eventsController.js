import {
  getEventById,
  getEvents,
  updateById,
  createEvent,
  deleteEvent,
  unregisterMember,
  enregistrement

} from "../repository/eventsRepository.js";

export async function getAllOrSearch(req, res) {
  const { titre, lieu, date } = req.query;

  if (titre || lieu || date) {
    return search(req, res);
  }
  return get(req, res);
}

//get
export async function get(req, res) {
  try {
    const events = await getEvents({}, { _id: 1, titre: 1 });
    return res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function search(req, res) {
  try {
    const filter = {};

    if (req.query.titre) {
      filter.titre = { $regex: req.query.titre, $options: "i" };
    }
    if (req.query.lieu) {
      filter.lieu = { $regex: req.query.lieu, $options: "i" };
    }
    if (req.query.date) {
      const date = new Date(req.query.date);

      //gte date >= à la date du filtre et < à celle du jour suivant en ms
      filter.date = {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      };
    }
    const events = await getEvents(filter, {
      _id: 1,
      titre: 1,
      lieu: 1,
      date: 1,
      nbPlace: 1,
    });
    return res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function getById(req, res) {
  const { id } = req.params;

  try {
    const event = await getEventById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        err: "Évènement introuvable",
      });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function create(req, res) {
  const  {userRole, data } = req.body;
  if (userRole !== "admin") {
    return res.status(403).json ({ok: false, error: "action réservée aux admin"});
  }
  try {
    req.body.titre = String(req.body.titre);
    req.body.description = String(req.body.description);
    req.body.lieu = String(req.body.lieu);
    req.body.date = new Date(req.body.date);
    req.body.nbPlace = Number(req.body.nbPlace);

    const data = {
      ...req.body,
    };

    await createEvent(data);
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ ok: false, error: err.message });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const {userRole, data} = req.body;
   if (userRole !== "admin") {
    return res.status(403).json ({ok: false, error: "action reservée aux admins"});
   }
  try {
    const event = await updateById(id, data);

    if (!event) {
      return res
        .status(404)
        .json({ ok: false, error: "Évènement introuvable" });
    }

    return res.json({ ok: true, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function drop(req, res) {
  const { id } = req.params;
  
  const {userRole} = req.body;
  if (userRole !== "admin") {
    return res.status(403).json({
      ok: false,
      error: "Action interdite"
    });
  }
  try {
    const event = await deleteEvent(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        error: "Évènement introuvable",
      });
    }

    return res.json({ ok: true, message: "Évènement supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
  
}
// enregistrement à un évènement et desinscription

export async function inscrireevenement(req, res) {
  try {
   const {id}= req.params;
   const { userId } = req.body;
   if (!userId) {
    return res.status(400).json ({ ok: false, error : "erreur ID"});
   }
  const eventCheck = await getEventById(id);
  if (!eventCheck) {
    return res.status(404).json ({ok: false, error: "évènement introuvable"});
  }
  if (eventCheck.participants.length >= eventCheck.nbPlace) {
    return res.status (400).json ({
      ok: false,
      error : "désolé, il n'y a plus de places disponible"
    });
  }
  const alreadyregistered = eventCheck.participants.includes(userId);
  if (alreadyregistered) {
    return res.status (400).json ({ok: false, error : "vous êtes déja inscrits"});
  }
  const event = await enregistrement (id, userId);
  return res.json ({ok: true, message: "Inscription validé", event : event});
 } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function unregister (req, res) {
    try {
      const {id} = req.params;
      const {userId, requesterId, userRole} = req.body;

      const isSelf = (requesterId === userId);
      const isAdmin = (userRole === 'admin');

      if (!userId) {
        return res.status (400).json ({ok : false, error : "id user manquant"});
      }
      if (!isSelf){
        return res.status(403).json ({
          ok:false,
          error: "Vous n'avez pas l'authorisation."
        });
      }
      const event = await unregisterMember(id, userId);
      if (!event) {
        return res.status (404).json ({ok : false, error: "évènement introuvable"});
      }
      return res.json ({
        ok:true,
        message : "désinscription réussie",
        event
      });
    }catch (err) {
      console.error(err);
      res.status (500).json({ ok: false, error: err.message });
    }
  }


