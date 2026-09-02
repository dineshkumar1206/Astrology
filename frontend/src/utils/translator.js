import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * Translates a given text to the target language (e.g., 'ta' for Tamil) using the free Google Translate API.
 * @param {string} text - The input text to translate.
 * @param {string} targetLang - The target language code.
 * @returns {Promise<string>} The translated text or original text if translation fails.
 */
export async function translateText(text, targetLang) {
  if (!text || !targetLang || targetLang === 'en') {
    return text; // Return immediately for English or empty strings
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await axios.get(url);

    // Google Translate returns structured nested arrays:
    // [[[ "translated_text", "original_text", null, null, 1 ]], null, "en"]
    if (response.data && response.data[0]) {
      const translatedSentences = response.data[0]
        .map((sentence) => sentence[0])
        .filter(Boolean)
        .join('');
      return translatedSentences || text;
    }
  } catch (error) {
    console.error('Dynamic translation failed:', error);
  }
  return text; // Fallback to original text
}

/**
 * Translates an entire product object (name, description, etc.)
 * @param {Object} product - The product from the DB.
 * @param {string} targetLang - The target language.
 * @returns {Promise<Object>} The translated product.
 */
export async function translateProduct(product, targetLang) {
  if (!product || targetLang === 'en') return product;

  try {
    const [translatedName, translatedDesc] = await Promise.all([
      translateText(product.name, targetLang),
      translateText(product.desc || '', targetLang)
    ]);

    return {
      ...product,
      name: translatedName,
      desc: translatedDesc
    };
  } catch (err) {
    console.error('Failed to translate product:', err);
    return product;
  }
}

/**
 * Translates a testimonial object (name, role, quote)
 * @param {Object} testimonial - The testimonial from the DB.
 * @param {string} targetLang - The target language.
 * @returns {Promise<Object>} The translated testimonial.
 */
export async function translateTestimonial(testimonial, targetLang) {
  if (!testimonial || targetLang === 'en') return testimonial;

  try {
    const [translatedName, translatedRole, translatedQuote] = await Promise.all([
      translateText(testimonial.name, targetLang),
      translateText(testimonial.role, targetLang),
      translateText(testimonial.quote, targetLang)
    ]);

    return {
      ...testimonial,
      name: translatedName,
      role: translatedRole,
      quote: translatedQuote
    };
  } catch (err) {
    console.error('Failed to translate testimonial:', err);
    return testimonial;
  }
}

/**
 * React Hook to translate any text dynamically on the client side.
 * @param {string} text - The input text to translate.
 * @param {string} targetLang - The target language ('en', 'ta').
 * @returns {string} The translated text.
 */
export function useTranslatedText(text, targetLang) {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let active = true;
    if (!text || targetLang === 'en') {
      setTranslated(text);
      return;
    }
    translateText(text, targetLang).then((res) => {
      if (active) setTranslated(res);
    });
    return () => {
      active = false;
    };
  }, [text, targetLang]);

  return translated;
}

/**
 * React Hook to translate an array of product objects dynamically on the client side.
 * @param {Array} list - The list of product/item objects from DB or fallbacks.
 * @param {string} targetLang - The target language code ('en', 'ta').
 * @returns {Array} The translated list.
 */
export function useTranslatedList(list, targetLang) {
  const [translated, setTranslated] = useState([]);

  useEffect(() => {
    let active = true;
    if (!list || list.length === 0) {
      setTranslated([]);
      return;
    }
    if (targetLang === 'en') {
      setTranslated(list);
      return;
    }

    setTranslated(list); // Snappy fallback display

    const translateAll = async () => {
      const result = await Promise.all(
        list.map(p => translateProduct(p, targetLang))
      );
      if (active) setTranslated(result);
    };
    translateAll();

    return () => {
      active = false;
    };
  }, [list, targetLang]);

  return translated;
}

/**
 * React Hook to translate an array of testimonial objects dynamically on the client side.
 * @param {Array} list - The list of testimonial objects from DB or fallbacks.
 * @param {string} targetLang - The target language code ('en', 'ta').
 * @returns {Array} The translated list.
 */
export function useTranslatedTestimonials(list, targetLang) {
  const [translated, setTranslated] = useState([]);

  useEffect(() => {
    let active = true;
    if (!list || list.length === 0) {
      setTranslated([]);
      return;
    }
    if (targetLang === 'en') {
      setTranslated(list);
      return;
    }

    setTranslated(list); // Snappy fallback display

    const translateAll = async () => {
      const result = await Promise.all(
        list.map(t => translateTestimonial(t, targetLang))
      );
      if (active) setTranslated(result);
    };
    translateAll();

    return () => {
      active = false;
    };
  }, [list, targetLang]);

  return translated;
}


