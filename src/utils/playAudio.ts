import { Audio } from 'expo-av';

const maleAudioFiles = {
  bem_vindo: require('../../assets/audios/male/bem_vindo.mp3'),
  editando_nome: require('../../assets/audios/male/editando_nome.mp3'),
  excluindo_perfil: require('../../assets/audios/male/excluindo_perfil.mp3'),
  alfabeto: require('../../assets/audios/male/alfabeto.mp3'),
  jogo_1_bem_vindo: require('../../assets/audios/male/jogo_1_bem_vindo.mp3'),
  jogo_2_bem_vindo: require('../../assets/audios/male/jogo_2_bem_vindo.mp3'),
  jogo_3_bem_vindo: require('../../assets/audios/male/jogo_3_bem_vindo.mp3'),
  // ALFABETO
  a_abelha: require('../../assets/audios/male/alphabet/a_abelha.mp3'),
  b_bola: require('../../assets/audios/male/alphabet/b_bola.mp3'),
  c_cachorro: require('../../assets/audios/male/alphabet/c_cachorro.mp3'),
  d_dado: require('../../assets/audios/male/alphabet/d_dado.mp3'),
  e_elefante: require('../../assets/audios/male/alphabet/e_elefante.mp3'),
  f_foca: require('../../assets/audios/male/alphabet/f_foca.mp3'),
  g_gato: require('../../assets/audios/male/alphabet/g_gato.mp3'),
  h_hipopotamo: require('../../assets/audios/male/alphabet/h_hipopotamo.mp3'),
  i_iguana: require('../../assets/audios/male/alphabet/i_iguana.mp3'),
  j_jacare: require('../../assets/audios/male/alphabet/j_jacare.mp3'),
  k_kiwi: require('../../assets/audios/male/alphabet/k_kiwi.mp3'),
  l_leao: require('../../assets/audios/male/alphabet/l_leao.mp3'),
  m_macaco: require('../../assets/audios/male/alphabet/m_macaco.mp3'),
  n_narval: require('../../assets/audios/male/alphabet/n_narval.mp3'),
  o_ovelha: require('../../assets/audios/male/alphabet/o_ovelha.mp3'),
  p_pato: require('../../assets/audios/male/alphabet/p_pato.mp3'),
  q_queijo: require('../../assets/audios/male/alphabet/q_queijo.mp3'),
  r_rato: require('../../assets/audios/male/alphabet/r_rato.mp3'),
  s_sapo: require('../../assets/audios/male/alphabet/s_sapo.mp3'),
  t_tigre: require('../../assets/audios/male/alphabet/t_tigre.mp3'),
  u_urso: require('../../assets/audios/male/alphabet/u_urso.mp3'),
  v_vaca: require('../../assets/audios/male/alphabet/v_vaca.mp3'),
  w_wombat: require('../../assets/audios/male/alphabet/w_wombat.mp3'),
  x_xicara: require('../../assets/audios/male/alphabet/x_xicara.mp3'),
  y_yak: require('../../assets/audios/male/alphabet/y_yak.mp3'),
  z_zebra: require('../../assets/audios/male/alphabet/z_zebra.mp3'),
};

const femaleAudioFiles = {
  bem_vindo: require('../../assets/audios/female/bem_vindo.mp3'),
  editando_nome: require('../../assets/audios/female/editando_nome.mp3'),
  excluindo_perfil: require('../../assets/audios/female/excluindo_perfil.mp3'),
  alfabeto: require('../../assets/audios/female/alfabeto.mp3'),
  jogo_1_bem_vindo: require('../../assets/audios/female/jogo_1_bem_vindo.mp3'),
  jogo_2_bem_vindo: require('../../assets/audios/female/jogo_2_bem_vindo.mp3'),
  jogo_3_bem_vindo: require('../../assets/audios/female/jogo_3_bem_vindo.mp3'),
  // ALFABETO
  a_abelha: require('../../assets/audios/female/alphabet/a_abelha.mp3'),
  b_bola: require('../../assets/audios/female/alphabet/b_bola.mp3'),
  c_cachorro: require('../../assets/audios/female/alphabet/c_cachorro.mp3'),
  d_dado: require('../../assets/audios/female/alphabet/d_dado.mp3'),
  e_elefante: require('../../assets/audios/female/alphabet/e_elefante.mp3'),
  f_foca: require('../../assets/audios/female/alphabet/f_foca.mp3'),
  g_gato: require('../../assets/audios/female/alphabet/g_gato.mp3'),
  h_hipopotamo: require('../../assets/audios/female/alphabet/h_hipopotamo.mp3'),
  i_iguana: require('../../assets/audios/female/alphabet/i_iguana.mp3'),
  j_jacare: require('../../assets/audios/female/alphabet/j_jacare.mp3'),
  k_kiwi: require('../../assets/audios/female/alphabet/k_kiwi.mp3'),
  l_leao: require('../../assets/audios/female/alphabet/l_leao.mp3'),
  m_macaco: require('../../assets/audios/female/alphabet/m_macaco.mp3'),
  n_narval: require('../../assets/audios/female/alphabet/n_narval.mp3'),
  o_ovelha: require('../../assets/audios/female/alphabet/o_ovelha.mp3'),
  p_pato: require('../../assets/audios/female/alphabet/p_pato.mp3'),
  q_queijo: require('../../assets/audios/female/alphabet/q_queijo.mp3'),
  r_rato: require('../../assets/audios/female/alphabet/r_rato.mp3'),
  s_sapo: require('../../assets/audios/female/alphabet/s_sapo.mp3'),
  t_tigre: require('../../assets/audios/female/alphabet/t_tigre.mp3'),
  u_urso: require('../../assets/audios/female/alphabet/u_urso.mp3'),
  v_vaca: require('../../assets/audios/female/alphabet/v_vaca.mp3'),
  w_wombat: require('../../assets/audios/female/alphabet/w_wombat.mp3'),
  x_xicara: require('../../assets/audios/female/alphabet/x_xicara.mp3'),
  y_yak: require('../../assets/audios/female/alphabet/y_yak.mp3'),
  z_zebra: require('../../assets/audios/female/alphabet/z_zebra.mp3'),
};

export const playAudio = async (gender, filename) => {
  console.log('# playAudio', gender, filename);
  const sound = new Audio.Sound();
  let audioFile;

  if (gender === 'male') {
    audioFile = maleAudioFiles[filename];
  } else if (gender === 'female') {
    audioFile = femaleAudioFiles[filename];
  }

  if (!audioFile) {
    console.error('Audio file not found');
    return;
  }

  try {
    await sound.loadAsync(audioFile);
    await sound.playAsync();
  } catch (error) {
    console.error('Failed to play the sound:', error);
  }
};
