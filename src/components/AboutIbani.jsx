import React from 'react';
import { Crown, Compass, BookOpen, Music, Anchor, Users } from 'lucide-react';

export default function AboutIbani() {
  return (
    <section className="about-section" id="about-ibani">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge badge-accent">
            <Crown size={14} />
            <span>Kingdoms of the Niger Delta</span>
          </div>
          <h2 className="section-title">The Heritage of Ịbạnị Language & People</h2>
          <p className="section-subtitle">
            Spoken along the saltwater delta waterways of Grand Bonny and Opobo, 
            Ibani represents centuries of maritime commerce, sovereign royalty, and artistic majesty.
          </p>
        </div>

        <div className="heritage-cards-grid">
          <div className="heritage-card">
            <div className="heritage-icon-box">
              <Crown size={28} />
            </div>
            <h3>Grand Bonny Kingdom (Okoloma)</h3>
            <p>
              Anciently known as <em>Okoloma</em> ("realm of the curlew birds"), Grand Bonny is 
              one of West Africa’s most famous historic city-states. Led by the Amanyanabo of Bonny, 
              it established diplomatic relations across the Atlantic and served as the epicenter 
              of eastern delta commerce, education, and early literacy.
            </p>
          </div>

          <div className="heritage-card">
            <div className="heritage-icon-box">
              <Anchor size={28} />
            </div>
            <h3>Opobo Kingdom</h3>
            <p>
              Founded in 1869 by the legendary merchant king <strong>King Jaja of Opobo</strong>, 
              Opobo Kingdom flourished on the banks of the Imo River estuary. The kingdom fiercely 
              guarded its economic sovereignty and developed unique socio-cultural music clubs like 
              Eremina Ogbo and the Ejesilem Movement.
            </p>
          </div>

          <div className="heritage-card">
            <div className="heritage-icon-box">
              <Music size={28} />
            </div>
            <h3>Music as an Oral Library</h3>
            <p>
              In Ibani culture, music (<em>nume</em>) is not mere entertainment—it is living history. 
              War chants, royal salutations, masquerade percussions (<em>Ikpirikpi</em>), and 
              hymns preserve genealogical lineages, maritime navigation wisdom, and linguistic vocabulary 
              across generations.
            </p>
          </div>
        </div>

        <div className="preservation-manifesto-card">
          <div className="manifesto-content">
            <h3>Why We Built This Digital Archive</h3>
            <p>
              Due to urbanization, internal migration, and the dominance of English and Nigerian Pidgin, 
              many indigenous African languages face generational decline. 
              <strong> Ịbạnị Nume</strong> connects youth, the global diaspora, linguists, and music lovers 
              with authentic Ibani soundscapes, providing embedded YouTube media paired with orthography guides, 
              lyrics, and translations to revitalize the language.
            </p>
            <div className="manifesto-tags">
              <span className="manifesto-tag">&bull; Grand Bonny</span>
              <span className="manifesto-tag">&bull; Opobo</span>
              <span className="manifesto-tag">&bull; Finima</span>
              <span className="manifesto-tag">&bull; Peterside</span>
              <span className="manifesto-tag">&bull; Queenstown</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
