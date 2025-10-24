import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DocumentPreviewProps {
  type: 'birth' | 'death' | 'marriage' | 'name_change';
  number: string;
  data: Record<string, string>;
  onPrint: () => void;
  onClose: () => void;
}

export const DocumentPreview = ({ type, number, data, onPrint, onClose }: DocumentPreviewProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г.`;
  };

  const renderBirthCertificate = () => (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 p-12 certificate-border certificate-pattern">
      <div className="official-document max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] mb-3 text-gray-600 font-semibold">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
          <h1 className="text-5xl mb-2 font-serif font-bold text-amber-900 tracking-wider">СВИДЕТЕЛЬСТВО</h1>
          <h2 className="text-3xl font-serif font-semibold text-amber-800 tracking-wide">О РОЖДЕНИИ</h2>
        </div>

        <div className="space-y-6 text-base leading-relaxed">
          <div className="space-y-3">
            <div>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 text-center min-h-[32px]">
                <span className="text-lg font-medium">{data.childLastName || '_________________'}</span>
              </div>
              <div className="text-center text-xs text-gray-600 mt-1 italic">фамилия</div>
            </div>
            
            <div>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 text-center min-h-[32px]">
                <span className="text-lg font-medium">{data.childFirstName || '_________________'}</span>
              </div>
              <div className="text-center text-xs text-gray-600 mt-1 italic">имя</div>
            </div>

            <div>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 text-center min-h-[32px]">
                <span className="text-lg font-medium">{data.childMiddleName || '_________________'}</span>
              </div>
              <div className="text-center text-xs text-gray-600 mt-1 italic">отчество</div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-32 flex-shrink-0">Пол:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-lg">{data.childGender || 'мужской'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-32 flex-shrink-0">Дата рождения:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-lg">{formatDate(data.birthDate)}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-32 flex-shrink-0">Место рождения:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-base">{data.birthPlace || '_________________'}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300">
            <div className="font-semibold mb-4 text-gray-700 tracking-wide">СВЕДЕНИЯ О РОДИТЕЛЯХ</div>
            
            <div className="mb-6">
              <div className="font-medium text-sm text-gray-600 mb-2">МАТЬ:</div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-xs w-16">Фамилия:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-base">{data.motherLastName || '_________________'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Имя:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-base">{data.motherFirstName || '_________________'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Отчество:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-base">{data.motherMiddleName || '_________________'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Гражданство:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-sm">{data.motherCitizenship || 'Российская Федерация'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Национальность:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-sm">{data.motherNationality || '_________________'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-medium text-sm text-gray-600 mb-2">ОТЕЦ:</div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-xs w-16">Фамилия:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-base">{data.fatherLastName || '_________________'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Имя:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-base">{data.fatherFirstName || '_________________'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Отчество:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-base">{data.fatherMiddleName || '_________________'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Гражданство:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-sm">{data.fatherCitizenship || 'Российская Федерация'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs w-16">Национальность:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span className="text-sm">{data.fatherNationality || '_________________'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300">
            <div className="text-sm space-y-2">
              <div className="flex gap-2">
                <span className="font-medium w-48">Место государственной регистрации:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{data.registrationPlace || '_________________'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Дата составления записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{formatDate(data.registrationDate)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Номер записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm font-mono">{number}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end">
            <div className="text-center">
              <div className="w-28 h-28 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2 bg-white">
                <span className="text-sm font-bold text-blue-600">М.П.</span>
              </div>
            </div>
            <div className="flex-1 ml-8 space-y-3">
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Дата выдачи:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span>{formatDate(data.registrationDate)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Руководитель органа ЗАГС:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1"></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">подпись</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-red-700 font-bold tracking-widest text-lg">{number}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeathCertificate = () => (
    <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50 p-12 certificate-border certificate-pattern">
      <div className="official-document max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] mb-3 text-gray-600 font-semibold">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
          <h1 className="text-5xl mb-2 font-serif font-bold text-gray-800 tracking-wider">СВИДЕТЕЛЬСТВО</h1>
          <h2 className="text-3xl font-serif font-semibold text-gray-700 tracking-wide">О СМЕРТИ</h2>
        </div>

        <div className="space-y-6 text-base leading-relaxed">
          <div className="space-y-3">
            <div>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 text-center min-h-[32px]">
                <span className="text-lg font-medium">{data.deceasedLastName || '_________________'}</span>
              </div>
              <div className="text-center text-xs text-gray-600 mt-1 italic">фамилия</div>
            </div>
            
            <div>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 text-center min-h-[32px]">
                <span className="text-lg font-medium">{data.deceasedFirstName || '_________________'}</span>
              </div>
              <div className="text-center text-xs text-gray-600 mt-1 italic">имя</div>
            </div>

            <div>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 text-center min-h-[32px]">
                <span className="text-lg font-medium">{data.deceasedMiddleName || '_________________'}</span>
              </div>
              <div className="text-center text-xs text-gray-600 mt-1 italic">отчество</div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Дата рождения:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-lg">{formatDate(data.birthDate)}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Дата смерти:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-lg">{formatDate(data.deathDate)}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Место смерти:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-base">{data.deathPlace || '_________________'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Причина смерти:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-base">{data.deathCause || '_________________'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Гражданство:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-base">{data.citizenship || 'Российская Федерация'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Национальность:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-base">{data.nationality || '_________________'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Семейное положение:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1 min-h-[32px]">
                <span className="text-base">{data.maritalStatus || '_________________'}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300">
            <div className="text-sm space-y-2">
              <div className="flex gap-2">
                <span className="font-medium w-48">Место государственной регистрации:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{data.registrationPlace || '_________________'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Дата составления записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{formatDate(data.registrationDate)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Номер записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm font-mono">{number}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end">
            <div className="text-center">
              <div className="w-28 h-28 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2 bg-white">
                <span className="text-sm font-bold text-blue-600">М.П.</span>
              </div>
            </div>
            <div className="flex-1 ml-8 space-y-3">
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Дата выдачи:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span>{formatDate(data.registrationDate)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Руководитель органа ЗАГС:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1"></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">подпись</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-red-700 font-bold tracking-widest text-lg">{number}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarriageCertificate = () => (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 p-12 certificate-border certificate-pattern">
      <div className="official-document max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] mb-3 text-gray-600 font-semibold">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
          <h1 className="text-5xl mb-2 font-serif font-bold text-rose-900 tracking-wider">СВИДЕТЕЛЬСТВО</h1>
          <h2 className="text-3xl font-serif font-semibold text-rose-800 tracking-wide">О ЗАКЛЮЧЕНИИ БРАКА</h2>
        </div>

        <div className="space-y-8 text-base leading-relaxed">
          <div>
            <div className="font-semibold mb-4 text-gray-700 tracking-wide">ЖЕНИХ:</div>
            <div className="space-y-3 pl-4">
              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium">{data.groomLastName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">фамилия до заключения брака</div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                    <span className="text-lg font-medium">{data.groomFirstName || '_________________'}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 italic">имя</div>
                </div>
                <div className="flex-1">
                  <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                    <span className="text-lg font-medium">{data.groomMiddleName || '_________________'}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 italic">отчество</div>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-32 flex-shrink-0">Дата рождения:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-base">{formatDate(data.groomBirthDate)}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-32 flex-shrink-0">Гражданство:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-sm">{data.groomCitizenship || 'Российская Федерация'}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-32 flex-shrink-0">Национальность:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-sm">{data.groomNationality || '_________________'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-300">
            <div className="font-semibold mb-4 text-gray-700 tracking-wide">НЕВЕСТА:</div>
            <div className="space-y-3 pl-4">
              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium">{data.brideLastName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">фамилия до заключения брака</div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                    <span className="text-lg font-medium">{data.brideFirstName || '_________________'}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 italic">имя</div>
                </div>
                <div className="flex-1">
                  <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                    <span className="text-lg font-medium">{data.brideMiddleName || '_________________'}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 italic">отчество</div>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-32 flex-shrink-0">Дата рождения:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-base">{formatDate(data.brideBirthDate)}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-32 flex-shrink-0">Гражданство:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-sm">{data.brideCitizenship || 'Российская Федерация'}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-32 flex-shrink-0">Национальность:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-sm">{data.brideNationality || '_________________'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-56 flex-shrink-0">Дата заключения брака:</span>
              <div className="border-b-2 border-dotted border-gray-500 pb-2 flex-1">
                <span className="text-lg font-medium">{formatDate(data.marriageDate)}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-56 flex-shrink-0">Место государственной регистрации:</span>
              <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                <span className="text-base">{data.marriagePlace || '_________________'}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="font-medium text-sm mb-3">Присвоенные фамилии после заключения брака:</div>
              <div className="flex gap-4 pl-4">
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Мужу:</div>
                  <div className="border-b border-dotted border-gray-500 pb-1">
                    <span className="text-base">{data.groomNewLastName || data.groomLastName}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Жене:</div>
                  <div className="border-b border-dotted border-gray-500 pb-1">
                    <span className="text-base">{data.brideNewLastName || data.brideLastName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300">
            <div className="text-sm space-y-2">
              <div className="flex gap-2">
                <span className="font-medium w-48">Дата составления записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{formatDate(data.registrationDate)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Номер записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm font-mono">{number}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end">
            <div className="text-center">
              <div className="w-28 h-28 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2 bg-white">
                <span className="text-sm font-bold text-blue-600">М.П.</span>
              </div>
            </div>
            <div className="flex-1 ml-8 space-y-3">
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Дата выдачи:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span>{formatDate(data.registrationDate)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Руководитель органа ЗАГС:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1"></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">подпись</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-red-700 font-bold tracking-widest text-lg">{number}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNameChangeCertificate = () => (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 p-12 certificate-border certificate-pattern">
      <div className="official-document max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] mb-3 text-gray-600 font-semibold">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
          <h1 className="text-5xl mb-2 font-serif font-bold text-indigo-900 tracking-wider">СВИДЕТЕЛЬСТВО</h1>
          <h2 className="text-3xl font-serif font-semibold text-indigo-800 tracking-wide">О ПЕРЕМЕНЕ ИМЕНИ</h2>
        </div>

        <div className="space-y-8 text-base leading-relaxed">
          <div>
            <div className="font-semibold mb-4 text-gray-700 tracking-wide">ПРЕЖНИЕ ДАННЫЕ:</div>
            <div className="space-y-3 pl-4">
              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium">{data.oldLastName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">фамилия</div>
              </div>
              
              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium">{data.oldFirstName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">имя</div>
              </div>

              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium">{data.oldMiddleName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">отчество</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-gray-300">
            <div className="font-semibold mb-4 text-gray-700 tracking-wide">НОВЫЕ ДАННЫЕ:</div>
            <div className="space-y-3 pl-4">
              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium text-indigo-700">{data.newLastName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">фамилия</div>
              </div>
              
              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium text-indigo-700">{data.newFirstName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">имя</div>
              </div>

              <div>
                <div className="border-b-2 border-dotted border-gray-500 pb-2 min-h-[32px]">
                  <span className="text-lg font-medium text-indigo-700">{data.newMiddleName || '_________________'}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 italic">отчество</div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Дата рождения:</span>
              <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                <span className="text-base">{formatDate(data.birthDate)}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Место рождения:</span>
              <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                <span className="text-base">{data.birthPlace || '_________________'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Гражданство:</span>
              <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                <span className="text-base">{data.citizenship || 'Российская Федерация'}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium w-40 flex-shrink-0">Национальность:</span>
              <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                <span className="text-base">{data.nationality || '_________________'}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-300">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium w-40 flex-shrink-0">Причина перемены имени:</span>
                <div className="border-b border-dotted border-gray-500 pb-1 flex-1">
                  <span className="text-base">{data.changeReason || '_________________'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-gray-300">
            <div className="text-sm space-y-2">
              <div className="flex gap-2">
                <span className="font-medium w-48">Место государственной регистрации:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{data.registrationPlace || '_________________'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Дата составления записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm">{formatDate(data.registrationDate)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-48">Номер записи акта:</span>
                <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                  <span className="text-sm font-mono">{number}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end">
            <div className="text-center">
              <div className="w-28 h-28 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2 bg-white">
                <span className="text-sm font-bold text-blue-600">М.П.</span>
              </div>
            </div>
            <div className="flex-1 ml-8 space-y-3">
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Дата выдачи:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1">
                    <span>{formatDate(data.registrationDate)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span>Руководитель органа ЗАГС:</span>
                  <div className="border-b border-dotted border-gray-500 flex-1 pb-1"></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">подпись</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-red-700 font-bold tracking-widest text-lg">{number}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="max-w-5xl w-full max-h-[95vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
        <div className="sticky top-0 p-4 print:hidden border-b flex items-center justify-between bg-white z-10">
          <h3 className="text-lg font-semibold">Предпросмотр документа — {number}</h3>
          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={onPrint}>
              <Icon name="Printer" size={16} className="mr-2" />
              Печать
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        
        <div className="p-8">
          {type === 'birth' && renderBirthCertificate()}
          {type === 'death' && renderDeathCertificate()}
          {type === 'marriage' && renderMarriageCertificate()}
          {type === 'name_change' && renderNameChangeCertificate()}
        </div>
      </div>
    </div>
  );
};
