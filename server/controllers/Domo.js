const models = require('../models');

const { Domo } = models;

const makerPage = (req, res) => {
  return res.render('app')
};

const getDomos = async (req, res) => {
  try{
    const query = {owner: req.session.account._id};
    const docs = await Domo.find(query).select('name age level').lean().exec();

    return res.json({domos:docs});
  }catch(err){
    console.log(err);
    return res.status(500).json({error: 'Error retrieving domos!'});
  }
}

const deleteDomo = async (req, res) => {
  try{
    const query = {owner: req.session.account._id, _id: req.query._id};
    const docs = await Domo.deleteOne(query).exec();
  
    return res.json({domos:docs});
  }catch(err){
    console.log(err);
    return res.status(500).json({error: 'Error deleting domo!'});
  }
} 

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.level) {
    return res.status(400).json({ error: 'Name, age, and level are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({name: newDomo.name, age: newDomo.age, level: newDomo.level});
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  deleteDomo,
};