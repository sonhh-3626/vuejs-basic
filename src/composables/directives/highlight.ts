interface HighlightBinding {
  value: {
    text: string;
    query?: string;
  };
}

const highlightText = (text: string, query: string): string => {
  if (!query || !text) return text;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 font-bold px-1 rounded">$1</mark>');
};

export const vHighlightSearch = {
  mounted(el: HTMLElement, binding: HighlightBinding) {
    el.innerHTML = highlightText(binding.value.text, binding.value.query?.toLowerCase() || '');
  },
  updated(el: HTMLElement, binding: HighlightBinding) {
    el.innerHTML = highlightText(binding.value.text, binding.value.query?.toLowerCase() || '');
  }
};
