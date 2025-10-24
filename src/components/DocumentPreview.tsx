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
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const renderBirthCertificate = () => (
    <div className="official-document">
      <div className="text-center mb-8">
        <div className="text-xs tracking-widest mb-2 official-label">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h1 className="text-4xl font-serif tracking-wide mb-1 official-title">СВИДЕТЕЛЬСТВО</h1>
        <h2 className="text-3xl font-serif tracking-wide official-title">О РОЖДЕНИИ</h2>
      </div>

      <div className="space-y-4 official-content">
        <div className="flex items-baseline gap-2">
          <span className="text-sm w-32 flex-shrink-0"></span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.childLastName}</span>
          </div>
        </div>
        <div className="text-center text-xs italic -mt-2">фамилия</div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-sm w-32 flex-shrink-0"></span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.childFirstName} {data.childMiddleName}</span>
          </div>
        </div>
        <div className="text-center text-xs italic -mt-2">имя, отчество</div>

        <div className="flex items-baseline gap-2 mt-6">
          <span className="text-sm w-32 flex-shrink-0">родился(лась)</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{formatDate(data.birthDate)}</span>
          </div>
        </div>
        <div className="text-center text-xs italic -mt-2">число, месяц, год (прописью и цифрами)</div>

        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-sm w-32 flex-shrink-0">место рождения</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.birthPlace}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0">Отец</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.fatherLastName}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2 mb-3">фамилия</div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0"></span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.fatherFirstName} {data.fatherMiddleName}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2 mb-3">имя, отчество</div>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0">Мать</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.motherLastName}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2 mb-3">фамилия</div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0"></span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.motherFirstName} {data.motherMiddleName}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2">имя, отчество</div>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-4">
            <span className="text-sm">Место государственной регистрации</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="text-sm italic">{data.registrationPlace}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div className="text-center">
            <div className="w-32 h-32 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-xs">М.П.</span>
            </div>
          </div>
          <div className="flex-1 ml-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm">Дата выдачи «</span>
              <div className="border-b border-dotted border-gray-600 pb-1 px-4">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getDate()}</span>
              </div>
              <span className="text-sm">»</span>
              <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).toLocaleDateString('ru-RU', { month: 'long' })}</span>
              </div>
              <div className="border-b border-dotted border-gray-600 pb-1 px-8">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getFullYear()}</span>
              </div>
              <span className="text-sm">г.</span>
            </div>
            <div className="border-b border-dotted border-gray-600 pb-1 w-full mb-1"></div>
            <div className="text-right text-xs italic">подпись</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-red-700 font-bold tracking-widest">{number}</div>
        </div>
      </div>
    </div>
  );

  const renderDeathCertificate = () => (
    <div className="official-document">
      <div className="text-center mb-8">
        <div className="text-xs tracking-widest mb-2 official-label">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h1 className="text-4xl font-serif tracking-wide mb-1 official-title">СВИДЕТЕЛЬСТВО</h1>
        <h2 className="text-3xl font-serif tracking-wide official-title">О СМЕРТИ</h2>
      </div>

      <div className="space-y-4 official-content">
        <div className="flex items-baseline gap-2">
          <span className="text-sm w-32 flex-shrink-0"></span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.lastName}</span>
          </div>
        </div>
        <div className="text-center text-xs italic -mt-2">фамилия</div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-sm w-32 flex-shrink-0"></span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.firstName} {data.middleName}</span>
          </div>
        </div>
        <div className="text-center text-xs italic -mt-2">имя, отчество</div>

        <div className="flex items-baseline gap-2 mt-6">
          <span className="text-sm w-24 flex-shrink-0">умер(ла)</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{formatDate(data.deathDate)}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm w-24 flex-shrink-0">место смерти</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.deathPlace}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-4">
            <span className="text-sm">Место государственной регистрации</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="text-sm italic">{data.registrationPlace}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div className="text-center">
            <div className="w-32 h-32 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-xs">М.П.</span>
            </div>
          </div>
          <div className="flex-1 ml-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm">Дата выдачи «</span>
              <div className="border-b border-dotted border-gray-600 pb-1 px-4">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getDate()}</span>
              </div>
              <span className="text-sm">»</span>
              <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).toLocaleDateString('ru-RU', { month: 'long' })}</span>
              </div>
              <div className="border-b border-dotted border-gray-600 pb-1 px-8">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getFullYear()}</span>
              </div>
              <span className="text-sm">г.</span>
            </div>
            <div className="border-b border-dotted border-gray-600 pb-1 w-full mb-1"></div>
            <div className="text-right text-xs italic">подпись</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-red-700 font-bold tracking-widest">{number}</div>
        </div>
      </div>
    </div>
  );

  const renderMarriageCertificate = () => (
    <div className="official-document">
      <div className="text-center mb-8">
        <div className="text-xs tracking-widest mb-2 official-label">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h1 className="text-4xl font-serif tracking-wide mb-1 official-title">СВИДЕТЕЛЬСТВО</h1>
        <h2 className="text-3xl font-serif tracking-wide official-title">О ЗАКЛЮЧЕНИИ БРАКА</h2>
      </div>

      <div className="space-y-4 official-content">
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0">Муж</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.groomLastNameBefore}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2 mb-3">фамилия</div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0"></span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.groomFirstName} {data.groomMiddleName}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2">имя, отчество</div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0">Жена</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.brideLastNameBefore}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2 mb-3">фамилия</div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm w-20 flex-shrink-0"></span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="official-data">{data.brideFirstName} {data.brideMiddleName}</span>
            </div>
          </div>
          <div className="text-center text-xs italic -mt-2">имя, отчество</div>
        </div>

        <div className="flex items-baseline gap-2 mt-6">
          <span className="text-sm flex-shrink-0">Дата заключения брака</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{formatDate(data.marriageDate)}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-4">
            <span className="text-sm">Место государственной регистрации</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="text-sm italic">{data.registrationPlace}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div className="text-center">
            <div className="w-32 h-32 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-xs">М.П.</span>
            </div>
          </div>
          <div className="flex-1 ml-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm">Дата выдачи «</span>
              <div className="border-b border-dotted border-gray-600 pb-1 px-4">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getDate()}</span>
              </div>
              <span className="text-sm">»</span>
              <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).toLocaleDateString('ru-RU', { month: 'long' })}</span>
              </div>
              <div className="border-b border-dotted border-gray-600 pb-1 px-8">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getFullYear()}</span>
              </div>
              <span className="text-sm">г.</span>
            </div>
            <div className="border-b border-dotted border-gray-600 pb-1 w-full mb-1"></div>
            <div className="text-right text-xs italic">подпись</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-red-700 font-bold tracking-widest">{number}</div>
        </div>
      </div>
    </div>
  );

  const renderNameChangeCertificate = () => (
    <div className="official-document">
      <div className="text-center mb-8">
        <div className="text-xs tracking-widest mb-2 official-label">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h1 className="text-4xl font-serif tracking-wide mb-1 official-title">СВИДЕТЕЛЬСТВО</h1>
        <h2 className="text-3xl font-serif tracking-wide official-title">О ПЕРЕМЕНЕ ИМЕНИ</h2>
      </div>

      <div className="space-y-4 official-content">
        <div className="mb-4">
          <div className="text-sm mb-2">Прежние фамилия, имя, отчество:</div>
          <div className="border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.lastNameBefore} {data.firstNameBefore} {data.middleNameBefore}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm mb-2">Новые фамилия, имя, отчество:</div>
          <div className="border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data text-lg">{data.lastNameAfter} {data.firstNameAfter} {data.middleNameAfter}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-6">
          <span className="text-sm w-32 flex-shrink-0">Дата рождения</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{formatDate(data.birthDate)}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm w-32 flex-shrink-0">Место рождения</span>
          <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
            <span className="official-data">{data.birthPlace}</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-4">
            <span className="text-sm">Место государственной регистрации</span>
            <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
              <span className="text-sm italic">{data.registrationPlace}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end">
          <div className="text-center">
            <div className="w-32 h-32 border-4 border-blue-600 rounded-full flex items-center justify-center mb-2">
              <span className="text-xs">М.П.</span>
            </div>
          </div>
          <div className="flex-1 ml-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-sm">Дата выдачи «</span>
              <div className="border-b border-dotted border-gray-600 pb-1 px-4">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getDate()}</span>
              </div>
              <span className="text-sm">»</span>
              <div className="flex-1 border-b border-dotted border-gray-600 pb-1 text-center">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).toLocaleDateString('ru-RU', { month: 'long' })}</span>
              </div>
              <div className="border-b border-dotted border-gray-600 pb-1 px-8">
                <span className="official-data">{new Date(data.registrationDate || Date.now()).getFullYear()}</span>
              </div>
              <span className="text-sm">г.</span>
            </div>
            <div className="border-b border-dotted border-gray-600 pb-1 w-full mb-1"></div>
            <div className="text-right text-xs italic">подпись</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-red-700 font-bold tracking-widest">{number}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
        <div className="p-6 print:hidden border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Предпросмотр документа</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-8">
          <div className="certificate-border bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-12 relative">
            <div className="absolute inset-0 certificate-pattern opacity-10"></div>
            <div className="relative z-10">
              {type === 'birth' && renderBirthCertificate()}
              {type === 'death' && renderDeathCertificate()}
              {type === 'marriage' && renderMarriageCertificate()}
              {type === 'name_change' && renderNameChangeCertificate()}
            </div>
          </div>
        </div>

        <div className="p-6 print:hidden border-t flex gap-3 justify-center bg-gray-50">
          <Button onClick={onPrint} className="gap-2">
            <Icon name="Printer" size={16} />
            Печать на бланк
          </Button>
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};
