const express = require("express");
const session = require("express-session");
const fileupload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const client = require("./db");
const app = express();
var path = require("path");
const { ObjectId } = require("mongodb");
const port = 5000;

const playlists = [
  {
    id: 1,
    nome: "playlist1",
    capa: "/imagens/img1.jpg",
    musicas: [
      {
        id: 1,
        nome: "cacimbinha",
        cantor: "caneta azul",
        arquivo: "/musicas/Calm Cam - TrackTribe.mp3",
        capa: "/imagens/img1.jpg",
      },
      {
        id: 2,
        nome: "show das poderosas",
        cantor: "guilherme brigss",
        arquivo: "/musicas/Jane Street - TrackTribe.mp3",
        capa: "/imagens/img1.jpg",
      },
    ],
  },
  {
    id: 2,
    nome: "playlist2",
    capa: "imagens/img2.jpg",
    musicas: [
      {
        nome: "show das poderosas",
        cantor: "guilherme brigss",
        arquivo: "/musicas/Jane Street - TrackTribe.mp3",
        capa: "/imagens/img2.jpg",
      },
    ],
  },
  {
    id: 3,
    nome: "playlist3",
    capa: "imagens/img3.jpg",
    musicas: [
      {
        nome: "so os loucos sabem",
        cantor: "faustao",
        arquivo: "musicas/On The Rocks - TrackTribe.mp3",
        capa: "/imagens/img3.jpg",
      },
    ],
  },
  {
    id: 4,
    nome: "playlist4",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
        capa: "/imagens/img4.jpg",
      },
    ],
  },
  {
    id: 5,
    nome: "playlist5",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 6,
    nome: "playlist6",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 7,
    nome: "playlist7",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 7,
    nome: "playlist7",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 7,
    nome: "playlist7",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 7,
    nome: "playlist7",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 7,
    nome: "playlist7",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
  {
    id: 7,
    nome: "playlist7",
    capa: "imagens/img4.jpg",
    musicas: [
      {
        nome: "vampiro",
        cantor: "matue",
        arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
      },
    ],
  },
];
const usuarios = [
  {
    nome: "Roberto",
    email: "roberto123@gmail.com",
    senha: "123123",
    id: 2,
    playlistspessoal: [
      {
        id: 1,
        nome: "cacimbinha",
        cantor: "caneta azul",
        arquivo: "/musicas/Calm Cam - TrackTribe.mp3",
        capa: "/imagens/img1.jpg",
      },
    ],
  },

  {
    nome: "Opa123",
    email: "castr34343@gmail.com",
    senha: "123123",
    id: 3,
  },
  {
    nome: "teste123",
    email: "teste@gmail.com",
    senha: "teste123",
    id: 4,
  },
];
const musicas = [
  {
    id: 1,
    nome: "cacimbinha",
    capa: "./imagens/img1.jpg",
    cantor: "caneta azul",
    arquivo: "/musicas/Calm Cam - TrackTribe.mp3",
  },
  {
    id: 2,
    nome: "show das poderosas",
    capa: "imagens/img1.jpg",
    cantor: "guilherme brigss",
    arquivo: "/musicas/Jane Street - TrackTribe.mp3",
  },
  {
    id: 3,
    nome: "so os loucos sabem",
    capa: "imagens/img2.jpg",
    cantor: "faustao",
    arquivo: "musicas/On The Rocks - TrackTribe.mp3",
  },
  {
    id: 4,
    nome: "vampiro",
    capa: "imagens/img4.jpg",
    cantor: "matue",
    arquivo: "musicas/Wish You'd Never Left - TrackTribe.mp3",
  },
];

app.use(session({ secret: "shauidxbgsaiuxsavbxsiauxvxuiaxvsaxsauisavasui" }));
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Sistema Iniciado");
});

app.get("/playlists", async (req, res) => {
  await client.connect();
  const db = await client.db("reactspotify");
  const play = await db.collection("playlists").find().toArray();
  res.send(play);
});

app.post("/playlists", async (req, res) => {
  const { nome } = req.body;

  try {
    const novaPlaylist = await Playlist.create({ nome });
    res.json(novaPlaylist);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao criar a playlist" });
  }
});

app.get("/playlists/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist não encontrada" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao buscar a playlist" });
  }
});

app.get("/usuarios", async (req, res) => {
  const { email } = req.query;

  try {
    await client.connect();
    const db = await client.db("reactspotify");

    if (email) {
      const usuario = await db.collection("usuarios").findOne({ email });
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(usuario);
      return;
    }

    const play = await db.collection("usuarios").find().toArray();
    res.send(play);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário" });
  }
});

app.post("/usuarios", async (req, res) => {
  const { _id, nome, email, senha } = req.body;

  try {
    // Salva o novo usuário no banco de dados
    await client.connect();
    const collection = client.db("reactspotify").collection("usuarios");
    const playlistcollection = client
      .db("reactspotify")
      .collection("playlists");
    const playlist = await playlistcollection.find().toArray();
    const newUser = {
      _id,
      nome,
      email,
      senha,
      playlists: playlist,
    };
    const result = await collection.insertOne(newUser);
    console.log(result.insertedCount);
    console.log(newUser);
    return res.json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nome, email, senha },
      { new: true }
    );
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário" });
  }
});

app.patch("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await client.connect();
    const db = await client.db("reactspotify");
    const collection = db.collection("usuarios");

    const usuario = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Filtra o documento pelo ID
      { $set: updates } // Define os campos a serem atualizados
    );

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Ocorreu um erro ao atualizar o usuário:", error);
    res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário" });
  } finally {
    client.close();
  }
});

app.get("/musicas", async (req, res) => {
  await client.connect();
  const db = await client.db("reactspotify");
  const play = await db.collection("musicas").find().toArray();
  res.send(play);
});

app.put("/playlists/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, capa, musicas } = req.body;

  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      id,
      { nome, capa, musicas },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({ error: "Playlist não encontrada" });
    }

    return res.json(updatedPlaylist);
  } catch (error) {
    console.error("Erro ao atualizar playlist:", error);
    return res.status(500).json({ error: "Erro ao atualizar playlist" });
  }
});

app.patch("/playlists/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({ error: "Playlist não encontrada" });
    }

    return res.json(updatedPlaylist);
  } catch (error) {
    console.error("Erro ao atualizar playlist:", error);
    return res.status(500).json({ error: "Erro ao atualizar playlist" });
  }
});

app.listen(port, () => {
  console.log("Rodando na porta..." + port);
});
