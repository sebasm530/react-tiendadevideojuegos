import React, { useState, useRef } from 'react';

const CoverDesigner = ({ onSave, initialCover = null, isEditing = false }) => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [price, setPrice] = useState(initialCover?.price || '');
  const [saving, setSaving] = useState(false);
  
  // Initial colors based on your original design
  const [colors, setColors] = useState({
    fondo: initialCover?.fondoColor || '#000000',
    joystickBase: initialCover?.joystickBaseColor || '#000000',
    joystickStick: initialCover?.joystickStickColor || '#000000',
    joystickInner: initialCover?.joystickInnerColor || '#ffffff',
    personajeCabeza: initialCover?.personajeCabezaColor || '#000000',
    personajeCuerpo: initialCover?.personajeCuerpoColor || '#000000',
    brazoIzq: initialCover?.brazoIzqColor || '#000000',
    brazoDer: initialCover?.brazoDerColor || '#000000',
    tituloRect: initialCover?.tituloRectColor || 'none'
  });

  const handlePartClick = (partId) => {
    setSelectedPart(partId);
    const partColor = colors[partId] === 'none' ? '#ffffff' : colors[partId];
    setCurrentColor(partColor);
  };

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor);
    if (selectedPart) {
      setColors(prev => ({
        ...prev,
        [selectedPart]: newColor
      }));
    }
  };

  const resetColors = () => {
    setColors({
      fondo: '#000000',
      joystickBase: '#000000',
      joystickStick: '#000000',
      joystickInner: '#ffffff',
      personajeCabeza: '#000000',
      personajeCuerpo: '#000000',
      brazoIzq: '#000000',
      brazoDer: '#000000',
      tituloRect: 'none'
    });
    setPrice('');
    setSelectedPart(null);
  };

  const generateSVGString = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" id="camiseta-svg" role="img" aria-label="Portada editable">
      <rect id="fondo" class="parte-camiseta" x="0.5" y="0.5" width="29" height="19" fill="${colors.fondo}" stroke="${colors.fondo}" stroke-width="0.5" rx="1"/>
      <circle id="joystick-base" class="parte-camiseta" cx="5" cy="15" r="2" fill="${colors.joystickBase}" stroke="#ffffff" stroke-width="0.2"/>
      <rect id="joystick-stick" class="parte-camiseta" x="4.6" y="11" width="0.8" height="4" rx="0.2" fill="${colors.joystickStick}" stroke="#ffffff" stroke-width="0.15"/>
      <circle id="joystick-inner" class="parte-camiseta" cx="5" cy="15" r="0.5" fill="${colors.joystickInner}"/>
      <circle id="personaje-cabeza" class="parte-camiseta" cx="25" cy="15" r="1.5" fill="${colors.personajeCabeza}" stroke="#ffffff" stroke-width="0.2"/>
      <rect id="personaje-cuerpo" class="parte-camiseta" x="24.5" y="16.5" width="1" height="3" rx="0.2" fill="${colors.personajeCuerpo}" stroke="#ffffff" stroke-width="0.15"/>
      <rect id="brazo-izq" class="parte-camiseta" x="23.5" y="17" width="1" height="0.5" fill="${colors.brazoIzq}" stroke="#ffffff" stroke-width="0.1"/>
      <rect id="brazo-der" class="parte-camiseta" x="25.5" y="17" width="1" height="0.5" fill="${colors.brazoDer}" stroke="#ffffff" stroke-width="0.1"/>
      <rect id="titulo-rect" class="parte-camiseta" x="5" y="2" width="20" height="4" fill="${colors.tituloRect}" stroke="#ffffff" stroke-width="0.3" rx="0.5"/>
    </svg>`;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const coverData = {
        fondoColor: colors.fondo,
        joystickBaseColor: colors.joystickBase,
        joystickStickColor: colors.joystickStick,
        joystickInnerColor: colors.joystickInner,
        personajeCabezaColor: colors.personajeCabeza,
        personajeCuerpoColor: colors.personajeCuerpo,
        brazoIzqColor: colors.brazoIzq,
        brazoDerColor: colors.brazoDer,
        tituloRectColor: colors.tituloRect,
        price: price ? parseFloat(price) : 0,
        portadaSVG: generateSVGString()
      };

      await onSave(coverData);
      if (!isEditing) {
        resetColors();
      }
    } catch (error) {
      console.error('Error saving cover:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text)' }}>
        Diseña tu portada🔥
      </h2>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* SVG Designer */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <svg 
            viewBox="0 0 30 20" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              maxHeight: '300px',
              cursor: 'pointer'
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect 
              x="0.5" y="0.5" width="29" height="19" 
              fill={colors.fondo} 
              stroke={colors.fondo} 
              strokeWidth="0.5" 
              rx="1"
              onClick={() => handlePartClick('fondo')}
              style={{ cursor: 'pointer' }}
            />

            {/* Joystick */}
            <circle 
              cx="5" cy="15" r="2" 
              fill={colors.joystickBase} 
              stroke="#ffffff" 
              strokeWidth="0.2"
              onClick={() => handlePartClick('joystickBase')}
              style={{ cursor: 'pointer' }}
            />
            <rect 
              x="4.6" y="11" width="0.8" height="4" 
              rx="0.2" 
              fill={colors.joystickStick} 
              stroke="#ffffff" 
              strokeWidth="0.15"
              onClick={() => handlePartClick('joystickStick')}
              style={{ cursor: 'pointer' }}
            />
            <circle 
              cx="5" cy="15" r="0.5" 
              fill={colors.joystickInner}
              onClick={() => handlePartClick('joystickInner')}
              style={{ cursor: 'pointer' }}
            />

            {/* Character */}
            <circle 
              cx="25" cy="15" r="1.5" 
              fill={colors.personajeCabeza} 
              stroke="#ffffff" 
              strokeWidth="0.2"
              onClick={() => handlePartClick('personajeCabeza')}
              style={{ cursor: 'pointer' }}
            />
            <rect 
              x="24.5" y="16.5" width="1" height="3" 
              rx="0.2" 
              fill={colors.personajeCuerpo} 
              stroke="#ffffff" 
              strokeWidth="0.15"
              onClick={() => handlePartClick('personajeCuerpo')}
              style={{ cursor: 'pointer' }}
            />
            <rect 
              x="23.5" y="17" width="1" height="0.5" 
              fill={colors.brazoIzq} 
              stroke="#ffffff" 
              strokeWidth="0.1"
              onClick={() => handlePartClick('brazoIzq')}
              style={{ cursor: 'pointer' }}
            />
            <rect 
              x="25.5" y="17" width="1" height="0.5" 
              fill={colors.brazoDer} 
              stroke="#ffffff" 
              strokeWidth="0.1"
              onClick={() => handlePartClick('brazoDer')}
              style={{ cursor: 'pointer' }}
            />

            {/* Title area */}
            <rect 
              x="5" y="2" width="20" height="4" 
              fill={colors.tituloRect} 
              stroke="#ffffff" 
              strokeWidth="0.3" 
              rx="0.5"
              onClick={() => handlePartClick('tituloRect')}
              style={{ cursor: 'pointer' }}
            />
          </svg>
        </div>

        {/* Controls */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value)}
              style={{ 
                width: '50px', 
                height: '40px', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            />
            
            <input
              type="number"
              className="form-input"
              min="0"
              step="0.01"
              placeholder="Precio (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ flex: 1, minWidth: '120px' }}
            />
            
            <button 
              className="btn primary" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
            </button>
            
            <button 
              className="btn ghost" 
              onClick={resetColors}
            >
              Reiniciar
            </button>
          </div>
          
          {selectedPart && (
            <p style={{ 
              marginTop: '12px', 
              fontSize: '14px', 
              color: 'var(--muted)',
              textAlign: 'center'
            }}>
              Parte seleccionada: <strong>{selectedPart}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverDesigner;