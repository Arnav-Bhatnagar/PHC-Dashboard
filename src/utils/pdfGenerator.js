import i18n from 'i18next'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = async (patient, lang = 'en') => {
  // switch language for translations
  if (i18n.language !== lang) await i18n.changeLanguage(lang)

  const t = i18n.t.bind(i18n)

  // Build a small HTML fragment for the PDF using translated strings
  const content = document.createElement('div')
  content.style.width = '800px'
  content.style.padding = '28px'
  content.style.background = '#fff'
  content.style.color = '#111'
  content.style.fontFamily = 'Arial, sans-serif'

  // build recommendations list (supports array translations)
  const recs = t('Recommendations', { returnObjects: true })
  const recHtml = Array.isArray(recs) ? recs.map(r => `<li>${r}</li>`).join('') : `<li>${recs}</li>`

  const importantNotice = t('Important Medical Notice') || 'In case of emergency symptoms ...'

  content.innerHTML = `
    <div style="text-align:center; margin-bottom:12px;">
      <div style="font-size:28px; font-weight:700; color:#1e40af">${t('Primary Health Centre')}</div>
      <div style="color:#3b82f6; font-weight:600">${t('Official Patient Health Record')}</div>
    </div>

    <div style="margin-bottom:10px; font-size:12px; color:#6b7280">${t('Document ID')}: PHC-${patient.id}-${Date.now().toString(36).toUpperCase()}</div>
    <div style="margin-bottom:18px; font-size:12px; color:#6b7280">${t('Generated on')}: ${new Date().toLocaleString()}</div>

    <div style="margin-bottom:14px;">
      <strong style="display:block; margin-bottom:6px">${t('Patient Name')}</strong>
      <div>${patient.name}</div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px">
      <div>
        <div style="font-size:11px; color:#4b5563">${t('Age')}</div>
        <div style="font-weight:600">${patient.age} ${t('years')}</div>
      </div>
      <div>
        <div style="font-size:11px; color:#4b5563">${t('Gender')}</div>
        <div style="font-weight:600">${t(patient.gender) || patient.gender}</div>
      </div>
    </div>

    <div style="margin-bottom:12px">
      <div style="font-size:11px; color:#4b5563">${t('Contact')}</div>
      <div style="font-weight:600">${patient.contact}</div>
    </div>

    <div style="margin:18px 0; padding:12px; background:#f3f4f6; border-radius:6px">
      <div style="font-weight:700; margin-bottom:6px">${t('Current Diagnosis')}</div>
      <div>${patient.diagnosis}</div>
    </div>

    <div style="margin-bottom:12px">
      <div style="font-weight:700; margin-bottom:6px">${t('Active Treatments')}</div>
      <div>
        ${(patient.treatments || []).map(tr => `<div style="margin-bottom:6px"><strong>${tr.name}</strong> — ${t('Started')}: ${tr.startDate} | ${t('Frequency')}: ${tr.frequency}</div>`).join('')}
      </div>
    </div>

    <div style="margin-top:8px">
      <div style="font-weight:700; margin-bottom:6px">${t('Treatment History')}</div>
      <div>${(patient.visits || []).map(v => `<div style="margin-bottom:8px"><strong>${v.diagnosis}</strong> — ${t('Date')}: ${v.date}<br/>${t('BP')}: ${v.bp} | ${t('Weight')}: ${v.weight}<div style="font-style:italic">${v.notes}</div></div>`).join('')}</div>
    </div>

    <div style="margin-top:16px; font-size:12px; color:#6b7280">${t('Verification Code')}: PHC-${Date.now().toString(36).toUpperCase()}</div>

    <div style="margin-top:18px">
      <div style="font-weight:700; margin-bottom:8px">${t('Medical Recommendations & Care Instructions')}</div>
      <div style="background:linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%); padding:12px; border-radius:6px">
        <ul style="margin-left:18px; color:#6b21a8">${recHtml}</ul>
      </div>
    </div>

    <div style="margin-top:14px; background:#fee2e2; padding:10px; border-radius:6px">
      <div style="font-weight:700; color:#991b1b">${t('Important Medical Notice')}</div>
      <div style="margin-top:6px; color:#991b1b">${importantNotice}</div>
    </div>

    <div style="margin-top:18px; font-size:12px; color:#6b7280">${t('Recommended Follow-up Date')}: ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>

    <div style="margin-top:22px; font-size:11px; color:#6b7280">${t('PHC Contact Number')}: 1800-XXX-XXXX | ${t('Emergency Helpline')}: 108 / 102</div>

    <div style="margin-top:22px; text-align:center; color:#6b7280; font-size:11px">
      <div style="font-weight:700">${t('OFFICIAL MEDICAL DOCUMENT')}</div>
      <div style="margin-top:6px">${t('Footer.Line1')}</div>
      <div>${t('Footer.Line2')}</div>
    </div>
  `

  // temporarily add to DOM so html2canvas can render styles
  content.style.position = 'fixed'
  content.style.left = '-9999px'
  document.body.appendChild(content)

  try {
    const canvas = await html2canvas(content, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: [canvas.width, canvas.height] })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    const fileName = `PHC_Record_${patient.name.replace(/\s+/g, '_')}_${lang}_${Date.now()}.pdf`
    pdf.save(fileName)
  } catch (err) {
    console.error('PDF generation failed', err)
    // fallback: download HTML file
    const blob = new Blob([content.innerHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `PHC_Official_Record_${patient.name.replace(/\s+/g, '_')}_${lang}_${new Date().getTime()}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } finally {
    document.body.removeChild(content)
  }
}

// status color helper (kept for potential future use)
export function getStatusBadgeColor(status) {
  switch(status) {
    case 'recovered': return '#d1fae5'
    case 'improving': return '#dbeafe'
    case 'stable': return '#fef3c7'
    case 'concern': return '#fed7aa'
    case 'critical': return '#fecaca'
    default: return '#f3f4f6'
  }
}

