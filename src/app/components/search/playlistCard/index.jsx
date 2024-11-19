import React from 'react';

const PlaylistCard = ({ playlist }) => {
  const { title, slug, game_ambience_tags, game_setting_tags } = playlist;

  // Récupérer les tags d'ambiance (game_ambience_tags) et les univers (game_setting_tags)
  const ambienceTags = game_ambience_tags.map(tag => tag.tag_name).join(', ');
  const settingTags = game_setting_tags.map(tag => tag.tag_name).join(', ');

  return (
    <a href={`/fr/playlist/${slug}`} className="playlist-card">
      <div className="playlist-card__content">
        {/* Titre de la playlist */}
        <h2 className="playlist-card__title">{title}</h2>

        {/* Affichage des univers (setting tags) */}
        <div className="playlist-card__setting">
          <strong>Univers :</strong> {settingTags || 'Non spécifié'}
        </div>

        {/* Affichage des ambiances (ambience tags) */}
        <div className="playlist-card__ambience">
          <strong>Ambiance :</strong> {ambienceTags || 'Non spécifié'}
        </div>
      </div>
    </a>
  );
};

export default PlaylistCard;
