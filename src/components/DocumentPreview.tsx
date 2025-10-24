import { Card } from '@/components/ui/card';
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
  const renderBirthCertificate = () => (
    <div className="space-y-6">
      <div className="text-center border-b-2 border-primary pb-4">
        <div className="text-xs text-muted-foreground">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h2 className="text-2xl font-bold mt-2">СВИДЕТЕЛЬСТВО О РОЖДЕНИИ</h2>
        <div className="text-sm text-muted-foreground mt-1">Номер записи акта: {number}</div>
      </div>
      
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-semibold mb-1">Фамилия, имя, отчество:</div>
          <div className="pl-4">{data.childLastName} {data.childFirstName} {data.childMiddleName}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-1">Дата рождения:</div>
            <div className="pl-4">{data.birthDate}</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Место рождения:</div>
            <div className="pl-4">{data.birthPlace}</div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-1">Мать:</div>
          <div className="pl-4">{data.motherLastName} {data.motherFirstName} {data.motherMiddleName}</div>
          {data.motherBirthDate && <div className="pl-4 text-xs text-muted-foreground">Дата рождения: {data.motherBirthDate}</div>}
        </div>

        <div>
          <div className="font-semibold mb-1">Отец:</div>
          <div className="pl-4">{data.fatherLastName} {data.fatherFirstName} {data.fatherMiddleName}</div>
          {data.fatherBirthDate && <div className="pl-4 text-xs text-muted-foreground">Дата рождения: {data.fatherBirthDate}</div>}
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold">Дата составления:</div>
              <div>{data.registrationDate}</div>
            </div>
            <div>
              <div className="font-semibold">Место государственной регистрации:</div>
              <div>{data.registrationPlace}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeathCertificate = () => (
    <div className="space-y-6">
      <div className="text-center border-b-2 border-primary pb-4">
        <div className="text-xs text-muted-foreground">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h2 className="text-2xl font-bold mt-2">СВИДЕТЕЛЬСТВО О СМЕРТИ</h2>
        <div className="text-sm text-muted-foreground mt-1">Номер записи акта: {number}</div>
      </div>
      
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-semibold mb-1">Фамилия, имя, отчество умершего:</div>
          <div className="pl-4">{data.lastName} {data.firstName} {data.middleName}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-1">Дата рождения:</div>
            <div className="pl-4">{data.birthDate}</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Дата смерти:</div>
            <div className="pl-4">{data.deathDate}</div>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-1">Место смерти:</div>
          <div className="pl-4">{data.deathPlace}</div>
        </div>

        {data.deathCause && (
          <div>
            <div className="font-semibold mb-1">Причина смерти:</div>
            <div className="pl-4 text-xs">{data.deathCause}</div>
          </div>
        )}

        <div className="border-t pt-4 mt-6">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold">Дата составления:</div>
              <div>{data.registrationDate}</div>
            </div>
            <div>
              <div className="font-semibold">Место государственной регистрации:</div>
              <div>{data.registrationPlace}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarriageCertificate = () => (
    <div className="space-y-6">
      <div className="text-center border-b-2 border-primary pb-4">
        <div className="text-xs text-muted-foreground">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h2 className="text-2xl font-bold mt-2">СВИДЕТЕЛЬСТВО О ЗАКЛЮЧЕНИИ БРАКА</h2>
        <div className="text-sm text-muted-foreground mt-1">Номер записи акта: {number}</div>
      </div>
      
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-semibold mb-1">Муж:</div>
          <div className="pl-4">{data.groomLastNameBefore} {data.groomFirstName} {data.groomMiddleName}</div>
          {data.groomLastNameAfter && data.groomLastNameAfter !== data.groomLastNameBefore && (
            <div className="pl-4 text-xs text-muted-foreground">Фамилия после брака: {data.groomLastNameAfter}</div>
          )}
        </div>

        <div>
          <div className="font-semibold mb-1">Жена:</div>
          <div className="pl-4">{data.brideLastNameBefore} {data.brideFirstName} {data.brideMiddleName}</div>
          {data.brideLastNameAfter && data.brideLastNameAfter !== data.brideLastNameBefore && (
            <div className="pl-4 text-xs text-muted-foreground">Фамилия после брака: {data.brideLastNameAfter}</div>
          )}
        </div>

        <div>
          <div className="font-semibold mb-1">Дата заключения брака:</div>
          <div className="pl-4">{data.marriageDate}</div>
        </div>

        <div>
          <div className="font-semibold mb-1">Место заключения брака:</div>
          <div className="pl-4">{data.marriagePlace}</div>
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold">Дата составления:</div>
              <div>{data.registrationDate}</div>
            </div>
            <div>
              <div className="font-semibold">Место государственной регистрации:</div>
              <div>{data.registrationPlace}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNameChangeCertificate = () => (
    <div className="space-y-6">
      <div className="text-center border-b-2 border-primary pb-4">
        <div className="text-xs text-muted-foreground">РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <h2 className="text-2xl font-bold mt-2">СВИДЕТЕЛЬСТВО О ПЕРЕМЕНЕ ИМЕНИ</h2>
        <div className="text-sm text-muted-foreground mt-1">Номер записи акта: {number}</div>
      </div>
      
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-semibold mb-1">Прежние фамилия, имя, отчество:</div>
          <div className="pl-4">{data.lastNameBefore} {data.firstNameBefore} {data.middleNameBefore}</div>
        </div>

        <div>
          <div className="font-semibold mb-1">Новые фамилия, имя, отчество:</div>
          <div className="pl-4 text-lg font-medium">{data.lastNameAfter} {data.firstNameAfter} {data.middleNameAfter}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-1">Дата рождения:</div>
            <div className="pl-4">{data.birthDate}</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Место рождения:</div>
            <div className="pl-4">{data.birthPlace}</div>
          </div>
        </div>

        {data.reason && (
          <div>
            <div className="font-semibold mb-1">Основание для перемены имени:</div>
            <div className="pl-4 text-xs">{data.reason}</div>
          </div>
        )}

        <div className="border-t pt-4 mt-6">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold">Дата составления:</div>
              <div>{data.registrationDate}</div>
            </div>
            <div>
              <div className="font-semibold">Место государственной регистрации:</div>
              <div>{data.registrationPlace}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 bg-white">
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-semibold">Предпросмотр документа</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="border-4 border-primary/20 p-8 bg-amber-50/30">
            {type === 'birth' && renderBirthCertificate()}
            {type === 'death' && renderDeathCertificate()}
            {type === 'marriage' && renderMarriageCertificate()}
            {type === 'name_change' && renderNameChangeCertificate()}
          </div>

          <div className="mt-6 flex gap-3 justify-center print:hidden">
            <Button onClick={onPrint} className="gap-2">
              <Icon name="Printer" size={16} />
              Печать на бланк
            </Button>
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
