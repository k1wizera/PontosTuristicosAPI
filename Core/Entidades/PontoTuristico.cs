using System.ComponentModel.DataAnnotations;

namespace Core.Entidades
{
    public class PontoTuristico
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O Título é obrigatório.")]
        public string Nome { get; set; }

        [MaxLength(100)]
        [Required(ErrorMessage = "A Descrição é obrigatória.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O Endereço é obrigatório.")]
        public string Endereco { get; set; }

        [Required(ErrorMessage = "A Cidade é obrigatória.")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "O Estado é obrigatório.")]
        public string Estado { get; set; }
        public DateTime DatadeInclusao { get; set; } = DateTime.Now;
    }
}
