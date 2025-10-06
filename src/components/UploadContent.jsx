import { useState } from 'react'
import { Upload, Video, FileText, X, Link as LinkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function UploadContent() {
  const [contentType, setContentType] = useState('video')
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
    videoUrl: '',
    articleContent: ''
  })
  const [uploadedItems, setUploadedItems] = useState([])
  const [previewUrl, setPreviewUrl] = useState(null)

  const categories = [
    'Maternal Health',
    'Child Health',
    'Vaccination',
    'Nutrition',
    'Disease Prevention',
    'First Aid',
    'Mental Health',
    'Hygiene & Sanitation',
    'General Wellness'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
      if (contentType === 'video' && file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newItem = {
      id: Date.now(),
      type: contentType,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      uploadDate: new Date().toLocaleDateString(),
      ...(contentType === 'video' && {
        videoUrl: formData.videoUrl || (formData.file ? URL.createObjectURL(formData.file) : ''),
        fileName: formData.file?.name
      }),
      ...(contentType === 'article' && {
        content: formData.articleContent
      })
    }

    setUploadedItems(prev => [newItem, ...prev])

    setFormData({
      title: '',
      description: '',
      category: '',
      file: null,
      videoUrl: '',
      articleContent: ''
    })
    setPreviewUrl(null)

    const fileInput = document.getElementById('fileInput')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleDelete = (id) => {
    setUploadedItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('upload.title')}</h1>
        <p className="text-gray-600 mt-2">{t('upload.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setContentType('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                contentType === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Video size={20} />
              {t('upload.video')}
            </button>
            <button
              onClick={() => setContentType('article')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                contentType === 'article'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText size={20} />
              {t('upload.article')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('upload.titleLabel')} *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('upload.placeholder.title')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('upload.categoryLabel')} *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('upload.selectCategory')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{t(cat)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('upload.descriptionLabel')} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('upload.placeholder.description')}
              />
            </div>

            {contentType === 'video' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('upload.videoUrlLabel')}
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t('upload.placeholder.videoUrl')}
                    />
                  </div>
                </div>

                <div className="text-center text-gray-500 text-sm">{t('upload.orLabel')}</div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Video File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-600 mb-2">{t('upload.clickUpload')}</p>
                    <p className="text-xs text-gray-500">{t('upload.fileTypes')}</p>
                    <input
                      id="fileInput"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="fileInput"
                      className="mt-3 inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {t('upload.chooseFile')}
                    </label>
                    {formData.file && (
                      <p className="mt-2 text-sm text-green-600">
                        {t('upload.selected')}: {formData.file.name}
                      </p>
                    )}
                  </div>
                </div>

                {previewUrl && (
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('upload.preview')}
                      </label>
                      <video
                        src={previewUrl}
                        controls
                        className="w-full rounded-lg"
                      />
                    </div>
                )}
              </>
            )}

            {contentType === 'article' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content *
                </label>
                <textarea
                  name="articleContent"
                  value={formData.articleContent}
                  onChange={handleInputChange}
                  required
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Write your article content here..."
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('upload.upload')} {contentType === 'video' ? t('upload.video') : t('upload.article')}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('upload.recentUploads')}</h2>

          {uploadedItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-3 opacity-50" />
              <p>{t('upload.noContent')}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {uploadedItems.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {item.type === 'video' ? (
                        <Video size={20} className="text-blue-600" />
                      ) : (
                        <FileText size={20} className="text-green-600" />
                      )}
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full mb-2">
                    {t(item.category)}
                  </span>

                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                  {item.type === 'video' && item.videoUrl && (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {t('upload.viewVideo')}
                    </a>
                  )}

                  {item.type === 'video' && item.fileName && !item.videoUrl && (
                    <p className="text-sm text-gray-500">{t('upload.fileLabel')}: {item.fileName}</p>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    {t('upload.uploadedOn')} {item.uploadDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
